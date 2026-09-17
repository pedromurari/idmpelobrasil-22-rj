import { useEffect } from "react";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { PillarCard } from "@/components/PillarCard";
import { FAQItem } from "@/components/FAQItem";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StudentGallery } from "@/components/StudentGallery";
import { Accordion } from "@/components/ui/accordion";
import rodrygoMurari from "@/assets/rodrygo-murari.jpg";
import { VideoPlayer } from "@/components/VideoPlayer";

const Index = () => {
  useEffect(() => {
    // Meta Pixel is loaded in index.html, PageView fires automatically
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="geometric-numbers" aria-hidden="true">
        <div className="number-float">1</div>
        <div className="number-float">2</div>
        <div className="number-float">3</div>
        <div className="number-float">4</div>
        <div className="number-float">5</div>
        <div className="number-float">6</div>
        <div className="number-float">7</div>
        <div className="number-float">8</div>
        <div className="number-float">9</div>
      </div>

      <section className="relative md:py-12 z-10 px-[15px] py-[5px]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <img
              alt="Instituto DespertaMente"
              className="h-20 md:h-28 w-auto animate-fade-in"
              src="/lovable-uploads/80f81ce8-3e86-4c85-861e-48dfe700a84d.png"
            />
          </div>

          <div className="text-center mb-8 animate-fade-in">
            <h1 className="hero-headline">
              <span className="headline-line highlight text-center text-2xl md:text-4xl">
                IDM Pelo Brasil Numerologia: Uma experiência presencial no
                Rio de Janeiro para quem quer aprender, vivenciar e aplicar a numerologia
                com clareza.
              </span>
            </h1>
            <h2 className="text-lg md:text-2xl text-muted-foreground mt-4 mb-2 font-semibold">
              Com Rodrygo Murari: Saia com seu mapa numerológico pronto,
              certificado e material de apoio exclusivo para aplicar
              imediatamente.
            </h2>

            <div className="w-full max-w-3xl mx-auto mb-6 -mx-[15px] md:mx-auto">
              <VideoPlayer />
            </div>

            <div className="text-lg md:text-xl text-muted-foreground space-y-2 max-w-3xl mx-auto">
              <div className="bg-card/50 border-2 border-primary/40 rounded-xl p-4 mt-4 mb-2">
                <p className="text-primary font-bold text-xl mb-2">
                  10 de Outubro no Rio de Janeiro - RJ!
                </p>
                <p className="font-semibold text-foreground text-base">
                  Vagas limitadas! Garanta sua vaga agora.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base mt-4">
                <span className="flex items-center gap-1">
                  Certificado de conclusão
                </span>
                <span className="flex items-center gap-1">
                  Material de apoio exclusivo
                </span>
                <span className="flex items-center gap-1">
                  Vagas limitadas
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-primary mt-4">
                Garanta sua vaga por apenas R$26 reais.
              </p>
            </div>
          </div>

          <div className="animate-fade-in">
            <EnrollmentForm />
          </div>
        </div>
      </section>

      <StudentGallery />

      <section className="md:py-8 relative z-10 px-[15px] py-[5px]">
        <div className="section-container section-highlight">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            O QUE VOCÊ VAI DESCOBRIR NESTA EXPERIÊNCIA PRESENCIAL
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Os 3 pilares do IDM Pelo Brasil Numerologia - conteúdo prático que
            você aplica no mesmo dia
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <PillarCard
              icon="🧠"
              title="Domine os fundamentos"
              subtitle="Calcule e interprete seus números com precisão"
              items={[
                "Cálculo correto do número de destino - entenda a rota da sua vida e tome decisões mais assertivas",
                "Interpretação completa dos números de 1 a 9 - descubra o significado por trás de cada número",
                "Estrutura base da numerologia pitagórica - aprenda o sistema milenar usado pelos maiores mestres",
                "Técnicas práticas de cálculo - domine o método passo a passo e aplique imediatamente",
              ]}
              footer="Aprenda o método exato usado por profissionais"
            />

            <PillarCard
              icon="❤️"
              title="Seu mapa pessoal"
              subtitle="Desvende sua essência e potencial único"
              items={[
                "Número da alma - descubra sua essência interior e o que realmente te motiva",
                "Número de expressão - entenda como você se manifesta e é percebido pelo mundo",
                "Leitura do mapa numerológico completo - saia do encontro com seu mapa pronto em mãos",
                "Padrões de comportamento - compreenda por que você age de determinada forma",
              ]}
              footer="Entenda sua personalidade de forma profunda"
            />

            <PillarCard
              icon="👁️"
              title="Numerologia na prática"
              subtitle="Transforme teoria em resultados concretos para o dia a dia"
              items={[
                "Numerologia residencial - harmonize a energia da sua casa e melhore o ambiente",
                "Energia da assinatura e nome profissional - potencialize sua marca pessoal",
                "Harmonizações simples para o dia a dia - aplique ajustes rápidos com resultados reais",
                "Numerologia em decisões importantes - use os números como guia estratégico",
              ]}
              footer="Ferramentas práticas que você usa imediatamente"
            />
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="md:py-8 relative z-10 px-[15px] py-[5px]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img
                alt="Instituto DespertaMente"
                className="h-20 md:h-28 w-auto"
                src="/lovable-uploads/80f81ce8-3e86-4c85-861e-48dfe700a84d.png"
              />
            </div>
            <h2 className="md:text-4xl font-bold text-foreground mb-6 text-2xl">
              QUEM ESTÁ POR TRÁS DESTE PROJETO?
            </h2>
            <div className="text-lg text-muted-foreground space-y-4 leading-relaxed">
              <p>
                O Instituto DespertaMente é referência em desenvolvimento
                humano, integrando Psicanálise, PNL, Hipnose e Numerologia
                Pitagórica Sistêmica.
              </p>
              <p>
                Nossa missão é clara: tornar o autoconhecimento acessível
                através de experiências transformadoras, vivências profundas e
                formações de altíssima qualidade.
              </p>
              <p className="font-semibold text-primary text-xl price-shine">
                Não é apenas teoria. É transformação real na vida de centenas de
                participantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="md:py-8 relative z-10 px-[15px] py-0">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              CONHEÇA SEU PROFESSOR
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-shrink-0">
                <img
                  src={rodrygoMurari}
                  alt="Rodrygo Murari"
                  className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover border-4 border-primary/30 shadow-2xl"
                />
                <div className="text-center mt-4">
                  <p className="text-2xl font-bold text-foreground">
                    Rodrygo Murari
                  </p>
                  <p className="text-primary font-semibold">
                    Fundador e Professor Especialista
                  </p>
                </div>
              </div>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <p className="text-center">
                  Com mais de <span className="text-primary font-bold">5.000 HORAS</span>{" "}
                  de atendimentos somados em setting terapêutico, experiências,
                  treinamentos e mentorias, Rodrygo Murari é especialista em
                  Metafísica Comportamental e PNL Sistêmica.
                </p>
                <p className="text-center">
                  Seu propósito? Levar uma "Numerologia Descomplicada".
                </p>
                <p className="text-center">
                  Sua abordagem revolucionária da Numerologia Sistêmica tem
                  transformado a vida de centenas de pessoas no Brasil e na
                  Europa.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <span className="flex items-center gap-2 text-primary">
                    Experiência comprovada
                  </span>
                  <span className="flex items-center gap-2 text-primary">
                    Metodologia exclusiva
                  </span>
                  <span className="flex items-center gap-2 text-primary">
                    Comprometimento com resultados reais
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="md:py-8 relative z-10 px-[15px] py-[5px]">
        <div className="section-container section-highlight">
          <div className="max-w-4xl mx-auto">
            <h2 className="md:text-4xl font-bold text-center text-foreground mb-8 text-2xl">
              POR QUE UMA EXPERIÊNCIA PRESENCIAL TÃO ACESSÍVEL?
            </h2>
            <div className="text-lg text-muted-foreground space-y-4 leading-relaxed mb-8">
              <p className="text-center">
                Você deve estar se perguntando: "Como uma experiência presencial
                com certificado pode custar apenas R$ 26?"
              </p>
              <p className="font-semibold text-primary text-xl text-center">
                A resposta é simples: nossa missão é democratizar o
                autoconhecimento.
              </p>
              <p className="text-center font-semibold text-foreground">
                Este não é um encontro online genérico. É uma experiência
                presencial, com a profundidade e a interação que só o contato
                direto pode oferecer.
              </p>
              <p className="text-center">
                Queremos que VOCÊ tenha acesso a ferramentas poderosas de
                transformação, independente da sua situação financeira.
              </p>
              <p className="text-center">
                O investimento simbólico de R$ 26 garante seu compromisso e
                nossa capacidade de organizar o melhor evento possível.
              </p>
              <p className="text-center text-primary font-bold">
                Aproveite: a próxima turma será pelo valor integral. Esta é uma
                oportunidade única.
              </p>
            </div>

            <div className="bg-card border-2 border-primary rounded-2xl p-8 text-center">
              <div className="flex justify-center gap-8 mb-6 flex-wrap">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Valor real da experiência:
                  </p>
                  <p className="text-3xl font-bold line-through text-muted-foreground">
                    R$ 497
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Seu investimento hoje:
                  </p>
                  <p className="text-4xl font-bold price-shine">R$ 26</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Economia:</p>
                  <p className="text-3xl font-bold text-primary">R$ 471</p>
                </div>
              </div>
              <p className="text-2xl font-bold price-shine">
                Sim, você está economizando 95%!
              </p>
            </div>

            <div className="mt-8 bg-card/50 border border-primary/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-center text-primary mb-6">
                O QUE ESTÁ INCLUSO:
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                {[
                  "Encontro presencial completo (4 horas)",
                  "Certificado de conclusão reconhecido",
                  "Material de apoio exclusivo",
                  "Seu mapa numerológico pronto",
                  "Café e networking",
                  "Suporte durante o evento",
                  "Acesso ao grupo exclusivo de participantes",
                  "Bônus surpresa no dia",
                ].map((item, index) => (
                  <p key={index} className="flex items-center gap-2">
                    {item}
                  </p>
                ))}
              </div>
              <p className="text-center text-xl font-bold price-shine mt-6">
                TUDO ISSO POR R$ 26!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            ÚLTIMAS VAGAS DISPONÍVEIS!
          </h2>
          <p className="text-xl text-primary font-semibold mb-8">
            Não perca esta oportunidade única - próxima turma pelo valor
            integral
          </p>
          <div className="text-lg text-muted-foreground space-y-4 mb-8 leading-relaxed">
            <p>Este é um evento presencial com vagas limitadas.</p>
            <p>
              Quando acabarem as vagas, não haverá mais oportunidade de
              participar nesta turma por esse valor promocional.
            </p>
            <p>A próxima turma (se houver) será pelo valor integral de R$ 497.</p>
            <div className="py-6 space-y-2">
              <p className="font-semibold text-primary text-xl">
                Você está a apenas 1 clique de transformar sua visão
              </p>
              <p className="font-semibold text-primary text-xl">
                São apenas R$ 26 - menos que um almoço
              </p>
              <p className="font-semibold text-primary text-xl">
                Risco zero e retorno infinito
              </p>
            </div>
            <p className="text-xl">
              A escolha é sua: continuar sem respostas ou descobrir seu
              verdadeiro propósito.
            </p>
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <button className="w-full max-w-md mx-auto h-auto py-4 px-6 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105">
              Últimas Vagas: Garanta Sua Experiência Presencial por R$26!
            </button>
          </a>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              + de 500 participantes já viveram esta experiência
            </p>
            <p className="flex items-center gap-2">98% de taxa de satisfação</p>
            <p className="flex items-center gap-2">
              Metodologia comprovada há mais de 10 anos
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-8 px-4 relative z-10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              PERGUNTAS FREQUENTES
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-xl">
              Tire Suas Dúvidas Antes de Garantir Sua Vaga
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              <FAQItem
                value="faq-1"
                question="Nunca estudei numerologia. Esta experiência é para mim?"
                answer="SIM! Este encontro foi desenvolvido especialmente para iniciantes. Você não precisa de conhecimento prévio. Vamos começar do zero e você sairá do evento já sabendo calcular e interpretar seu próprio mapa numerológico."
              />
              <FAQItem
                value="faq-2"
                question="Por que apenas R$ 26? Qual é a pegadinha?"
                answer="Não há pegadinha! Nossa missão é democratizar o autoconhecimento. O valor simbólico garante seu compromisso com a experiência e cobre custos básicos de material. Queremos que o máximo de pessoas possam ter acesso a essa transformação."
              />
              <FAQItem
                value="faq-3"
                question="O certificado é reconhecido?"
                answer="Sim! Você receberá um certificado de conclusão emitido pelo Instituto DespertaMente, válido como comprovação de participação e aprendizado em Numerologia Pitagórica Sistêmica."
              />
              <FAQItem
                value="faq-4"
                question="Quando e onde será a experiência?"
                answer="A experiência será realizada no dia 10/10 (Sábado), com duas turmas: Manhã (09h às 13h) e Tarde (14h às 18h), presencial na Rua Corrêa Dutra, 149 - Flamengo, Rio de Janeiro - RJ. As informações detalhadas serão enviadas imediatamente após sua inscrição, por WhatsApp."
              />
              <FAQItem
                value="faq-5"
                question="E se eu não puder comparecer depois de pagar?"
                answer="Entre em contato conosco com 48h de antecedência. Avaliaremos a possibilidade de transferir sua vaga para a próxima turma ou realizar o reembolso integral."
              />
              <FAQItem
                value="faq-6"
                question="Preciso levar algum material?"
                answer="Não! Todo material didático está incluso. Você só precisa levar você mesmo, com mente aberta e vontade de aprender. Recomendamos trazer uma garrafa de água e um caderno extra se quiser fazer anotações pessoais."
              />
              <FAQItem
                value="faq-7"
                question="Vou conseguir fazer cálculos numerológicos depois do encontro?"
                answer="COM CERTEZA! A experiência é 100% prática. Você vai calcular seu próprio mapa durante o evento e sairá de lá apto a calcular para outras pessoas. É aprender fazendo!"
              />
              <FAQItem
                value="faq-8"
                question="O pagamento é seguro?"
                answer="Absolutamente! Utilizamos a plataforma Cakto, uma das mais seguras do Brasil. Seus dados estão 100% protegidos e você receberá confirmação imediata do pagamento."
              />
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-6">
            <img
              alt="Instituto DespertaMente"
              className="h-16 w-auto"
              src="/lovable-uploads/b4dec95d-4969-4772-a141-d5494b0b2efc.png"
            />
          </div>
          <p className="text-xl font-semibold text-foreground">
            Instituto DespertaMente
          </p>
          <p className="text-muted-foreground">
            Transformando vidas através do autoconhecimento
          </p>

          <div className="space-y-2 text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              contato@institutodespertamente.com.br
            </p>
            <p className="flex items-center justify-center gap-2">
              WhatsApp: (11) 97537-9719
            </p>
            <p className="flex items-center justify-center gap-2">
              Rua Corrêa Dutra, 149 - Flamengo, Rio de Janeiro - RJ
            </p>
          </div>

          <div className="pt-6">
            <p className="text-muted-foreground mb-4">
              Siga-nos nas redes sociais:
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/institutodespertamente/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/institutodespertamente"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@institutodespertamente"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-border text-sm text-muted-foreground">
            <p>© 2026 Instituto DespertaMente. Todos os direitos reservados.</p>
            <p>CNPJ: 55.184.481/0001-24</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
