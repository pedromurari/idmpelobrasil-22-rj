import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Loader2, Calendar, MapPin } from "lucide-react";
import { MetaIdentity } from "../utils/meta-identity";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const NPA_EVENTO_ID = "094a35b9-88f7-453b-ae7d-b576a3142b40";

type TurmaOption = "10out_manha" | "10out_tarde" | null;

const TURMA_CONFIG = {
  "10out_manha": {
    label: "10/10 - Manhã",
    data: "10 de Outubro",
    diaSemana: "Sábado",
    horario: "09:00 às 13:00",
    endereco: "Rua Corrêa Dutra, 149 - Flamengo, Rio de Janeiro - RJ",
    enderecoDefinido: true,
    esgotada: false,
    checkoutUrl: "",
  },
  "10out_tarde": {
    label: "10/10 - Tarde",
    data: "10 de Outubro",
    diaSemana: "Sábado",
    horario: "14:00 às 18:00",
    endereco: "Rua Corrêa Dutra, 149 - Flamengo, Rio de Janeiro - RJ",
    enderecoDefinido: true,
    esgotada: true,
    checkoutUrl: "",
  },
};

export const EnrollmentForm = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedTurma, setSelectedTurma] = useState<TurmaOption>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
  };

  const validateForm = () => {
    if (name.trim().length < 3) {
      toast({
        title: "Nome inválido",
        description: "Por favor, digite seu nome completo (mínimo 3 caracteres)",
        variant: "destructive",
      });
      return false;
    }
    const numbers = whatsapp.replace(/\D/g, "");
    if (numbers.length < 10 || numbers.length > 11) {
      toast({
        title: "WhatsApp inválido",
        description: "Por favor, digite um número válido com DDD",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedTurma) {
      toast({
        title: "Selecione uma turma",
        description: "Por favor, escolha a turma que deseja participar",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const turmaConfig = TURMA_CONFIG[selectedTurma!];

    try {
      let cleanPhone = whatsapp.replace(/\D/g, "");
      if (cleanPhone.length >= 12 && cleanPhone.startsWith("55")) {
        cleanPhone = cleanPhone.slice(2);
      }
      cleanPhone = cleanPhone.slice(0, 11);
      const phoneToSend = `55${cleanPhone}`;

      const urlParams = new URLSearchParams(window.location.search);

      // Insert direto com anon key esta bloqueado por um bug de RLS
      // (leitura funciona, escrita nao). Usamos uma Edge Function com
      // service role, mesmo padrao ja usado em outras functions do
      // projeto (webhook-leads, lead-event), pra contornar isso.
      fetch(`${SUPABASE_URL}/functions/v1/npa-lead-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          npa_evento_id: NPA_EVENTO_ID,
          nome: name.trim(),
          whatsapp: phoneToSend,
          turma: selectedTurma === "10out_manha" ? "manha" : "tarde",
        }),
      }).catch((err) => console.error("Erro ao salvar no CRM:", err));

      const eventId = `npa_lp_rio_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      const { externalId, fbp, fbc } = MetaIdentity.getIdentity();

      MetaIdentity.saveUserData({
        phone: phoneToSend,
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(" "),
      });

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq(
          "track",
          "Lead",
          {
            content_name: `Inscrição - ${turmaConfig.label}`,
            status: "pending",
          },
          {
            eventID: eventId,
            external_id: externalId,
          }
        );
      }

      try {
        const testCode = urlParams.get("testCode");

        await fetch("/api/meta-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName: "Lead",
            eventID: eventId,
            testCode,
            fbp,
            fbc,
            externalId,
            userData: {
              phone: phoneToSend,
              firstName: name.split(" ")[0],
              lastName: name.split(" ").slice(1).join(" "),
            },
            customData: {
              content_name: `Inscrição - ${turmaConfig.label}`,
              status: "pending",
            },
          }),
        });
      } catch (capiError) {
        console.error("Erro ao enviar para CAPI:", capiError);
      }

      if (!turmaConfig.checkoutUrl) {
        setIsLoading(false);
        toast({
          title: "Interesse registrado!",
          description: "Assim que o checkout abrir, avisamos você pelo WhatsApp.",
        });
        return;
      }

      toast({
        title: "Dados salvos com sucesso!",
        description: "Redirecionando para o pagamento...",
      });

      setTimeout(() => {
        const checkoutEventId = `${eventId}_checkout`;
        const { externalId: freshExternalId, fbp: freshFbp, fbc: freshFbc } =
          MetaIdentity.getIdentity();
        const checkoutUrl = new URL(turmaConfig.checkoutUrl);
        checkoutUrl.searchParams.set("name", name.trim());
        checkoutUrl.searchParams.set("customer_name", name.trim());
        checkoutUrl.searchParams.set("phone_number", cleanPhone);
        checkoutUrl.searchParams.set("cellphone", phoneToSend);
        [
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_content",
          "utm_term",
          "testCode",
        ].forEach((key) => {
          const value = urlParams.get(key);
          if (value) checkoutUrl.searchParams.set(key, value);
        });

        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq(
            "track",
            "InitiateCheckout",
            {
              content_name: `IDM Pelo Brasil Numerologia - ${turmaConfig.label}`,
              content_type: "product",
              value: 26,
              currency: "BRL",
            },
            {
              eventID: checkoutEventId,
              external_id: freshExternalId,
            }
          );
        }

        const checkoutTestCode = urlParams.get("testCode");
        fetch("/api/meta-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName: "InitiateCheckout",
            eventID: checkoutEventId,
            testCode: checkoutTestCode,
            fbp: freshFbp,
            fbc: freshFbc,
            externalId: freshExternalId,
            userData: {
              firstName: name.split(" ")[0],
              lastName: name.split(" ").slice(1).join(" "),
              phone: phoneToSend,
            },
            customData: {
              content_name: `IDM Pelo Brasil Numerologia - ${turmaConfig.label}`,
              content_type: "product",
              value: 26,
              currency: "BRL",
            },
          }),
        }).catch((err) => console.error("Erro CAPI InitiateCheckout:", err));

        window.location.href = checkoutUrl.toString();
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro ao enviar dados",
        description: "Por favor, tente novamente ou entre em contato via WhatsApp.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-2xl"
    >
      <div className="text-center mb-6">
        <h3 className="md:text-3xl font-bold text-foreground mb-2 text-3xl">
          SIM! Quero minha vaga no IDM Pelo Brasil!
        </h3>
        <p className="text-muted-foreground text-lg">
          Garanta sua vaga agora e comece sua jornada de autodescoberta!
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="name" className="text-foreground font-medium">
            Nome Completo
          </Label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="name"
              name="nome"
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-11 h-12 bg-background/50 border-border focus:border-primary"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="whatsapp" className="text-foreground font-medium">
            WhatsApp
          </Label>
          <div className="relative mt-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              <Phone className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm font-semibold text-muted-foreground">+55</span>
            </div>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="(00) 00000-0000"
              value={whatsapp}
              onChange={handleWhatsAppChange}
              className="pl-20 h-12 bg-background/50 border-border focus:border-primary"
              required
            />
          </div>
        </div>

        <div>
          <Label className="text-foreground font-medium flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5" />
            Escolha sua turma - 10 de Outubro
          </Label>
          <div className="space-y-3">
            {(Object.keys(TURMA_CONFIG) as TurmaOption[])
              .filter(Boolean)
              .map((turmaKey) => {
                const turma = TURMA_CONFIG[turmaKey!];
                const isSelected = selectedTurma === turmaKey;
                const icon = turma.horario.includes("09:00")
                  ? "☀️"
                  : turma.horario.includes("14:00")
                    ? "🌇"
                    : "🌙";

                if (turma.esgotada) {
                  return (
                    <div
                      key={turmaKey}
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 relative overflow-hidden cursor-not-allowed opacity-60"
                    >
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none z-10"
                        preserveAspectRatio="none"
                      >
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#ef4444" strokeWidth="3" />
                      </svg>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 mt-1 rounded-full border-2 flex-shrink-0 border-muted-foreground/40" />
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg grayscale">{icon}</span>
                            <p className="font-semibold text-foreground">{turma.data}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                              {turma.diaSemana}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/80 text-white font-bold">
                              ESGOTADO
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {turma.horario}
                          </p>
                          <p className="text-xs mt-1 flex items-center gap-1 text-amber-500">
                            <MapPin className="h-3 w-3" />
                            {turma.endereco}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={turmaKey}
                    type="button"
                    onClick={() => setSelectedTurma(turmaKey)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-border bg-background/50 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 mt-1 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg">{icon}</span>
                          <p className="font-semibold text-foreground">{turma.data}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                            {turma.diaSemana}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {turma.horario}
                        </p>
                        <p
                          className={`text-xs mt-1 flex items-center gap-1 ${
                            turma.enderecoDefinido
                              ? "text-muted-foreground"
                              : "text-amber-500"
                          }`}
                        >
                          <MapPin className="h-3 w-3" />
                          {turma.endereco}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 px-8 rounded-full transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-lg uppercase tracking-wide shadow-lg relative overflow-hidden"
          style={{
            animation: isLoading ? "none" : "pulse-button 2s ease-in-out infinite",
            boxShadow:
              "0 8px 32px hsla(var(--primary) / 0.5), inset 0 -3px 0 rgba(0, 0, 0, 0.2), 0 0 0 3px hsla(var(--primary) / 0.2)",
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin inline" />
              Processando...
            </>
          ) : (
            <>Últimas Vagas: Garanta Sua Experiência por R$26!</>
          )}
        </button>

        <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Últimas vagas disponíveis!
          </p>
          <p className="flex items-center justify-center gap-1">
            Seus dados estão 100% seguros
          </p>
          <p className="flex items-center justify-center gap-1">
            Pagamento seguro via Mercado Pago
          </p>
        </div>
      </div>
    </form>
  );
};
