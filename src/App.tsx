import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FolderOpen,
  GraduationCap,
  Mail,
  Menu,
  MonitorCheck,
  Printer,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Step = {
  id: string;
  label: string;
  icon: typeof Mail;
};

const planSteps: Step[] = [
  { id: "dia-1", label: "Dia 1: Criar ou melhorar um e-mail profissional", icon: Mail },
  { id: "dia-2", label: "Dia 2: Montar ou revisar um currículo", icon: FileText },
  { id: "dia-3", label: "Dia 3: Organizar documentos e arquivos em pastas", icon: FolderOpen },
  { id: "dia-4", label: "Dia 4: Praticar um documento e uma planilha simples", icon: MonitorCheck },
  { id: "dia-5", label: "Dia 5: Aprender a procurar vagas com segurança", icon: SearchCheck },
  { id: "dia-6", label: "Dia 6: Preparar-se para uma entrevista por vídeo", icon: Video },
  { id: "dia-7", label: "Dia 7: Escolher um recurso gratuito para continuar aprendendo", icon: GraduationCap },
];

const checklistItems: Step[] = [
  { id: "email", label: "Tenho um e-mail profissional", icon: Mail },
  { id: "curriculo", label: "Meu currículo está atualizado", icon: FileText },
  { id: "anexos", label: "Sei anexar e compartilhar documentos", icon: ClipboardCheck },
  { id: "arquivos", label: "Organizei meus arquivos com nomes claros", icon: FolderOpen },
  { id: "seguranca", label: "Sei reconhecer sinais de uma vaga suspeita", icon: ShieldCheck },
  { id: "video", label: "Testei câmera, microfone e conexão", icon: Video },
  { id: "pratica", label: "Escolhi uma habilidade digital para praticar", icon: BookOpen },
];

const learningCards = [
  {
    title: "Preparar documentos e currículo",
    text: "Organize arquivos, revise informações essenciais e deixe seu currículo pronto para envio.",
    href: "#checklist",
    icon: FileText,
  },
  {
    title: "Habilidades digitais básicas",
    text: "Pratique e-mail, documentos, planilhas simples, apresentações e compartilhamento de arquivos.",
    href: "#plano",
    icon: MonitorCheck,
  },
  {
    title: "Buscar vagas com segurança",
    text: "Aprenda sinais de alerta e hábitos simples para proteger seus dados nas candidaturas.",
    href: "#busca-segura",
    icon: ShieldCheck,
  },
  {
    title: "Preparar-se para entrevistas on-line",
    text: "Teste câmera, microfone, conexão e ambiente antes de participar de uma videochamada.",
    href: "#plano",
    icon: Video,
  },
  {
    title: "Aprender gratuitamente",
    text: "Use fontes confiáveis e escolha uma habilidade digital para continuar praticando.",
    href: "#recursos",
    icon: GraduationCap,
  },
];

const redFlags = [
  "Cobrança para participar de processo seletivo",
  "Pedido imediato de senha, dados bancários ou documentos excessivos",
  "Promessa de salário irrealista",
  "Empresa sem informações verificáveis",
  "Links ou mensagens suspeitas",
];

const goodPractices = [
  "Pesquisar a empresa antes de enviar dados",
  "Usar canais oficiais e plataformas confiáveis",
  "Guardar registros das candidaturas",
  "Proteger dados pessoais em formulários e mensagens",
];

const resourceCategories = [
  {
    title: "Currículo e preparação para vagas",
    text: "Revise seu currículo antes de cada candidatura e adapte suas informações aos requisitos da vaga. Mantenha seus dados de contato atualizados e destaque experiências, cursos e habilidades relevantes.",
  },
  {
    title: "Documentos e planilhas",
    text: "Pratique criar documentos simples, organizar arquivos em pastas e utilizar planilhas básicas. Essas habilidades ajudam em processos seletivos e nas atividades do dia a dia profissional.",
  },
  {
    title: "Comunicação profissional",
    text: "Use e-mails claros, mensagens objetivas e uma linguagem respeitosa ao falar com empresas. Leia sua mensagem antes de enviar e evite abreviações excessivamente informais.",
  },
  {
    title: "Entrevistas on-line",
    text: "Antes da entrevista, teste a câmera, o microfone, a conexão com a internet e o ambiente ao seu redor. Procure um local silencioso e mantenha seus documentos por perto.",
  },
  {
    title: "Segurança digital",
    text: "Nunca compartilhe senhas, códigos de confirmação ou dados bancários durante processos seletivos. Confirme informações da empresa antes de responder a contatos suspeitos.",
  },
];

function usePersistentChecklist(key: string, ids: string[]) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(checked));
  }, [checked, key]);

  const completed = ids.filter((id) => checked[id]).length;

  return {
    checked,
    completed,
    toggle: (id: string) => setChecked((current) => ({ ...current, [id]: !current[id] })),
  };
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    ["Início", "#inicio"],
    ["Habilidades", "#habilidades"],
    ["Plano de 7 dias", "#plano"],
    ["Busca segura", "#busca-segura"],
    ["Recursos", "#recursos"],
    ["Sobre", "#sobre"],
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Primeiros Passos Digitais">
        <span className="brand-mark">PP</span>
        <span>Primeiros Passos Digitais</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <nav
        id="primary-navigation"
        className={isMenuOpen ? "is-open" : ""}
        aria-label="Navegação principal"
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#plano">
        Começar agora
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero section-shell">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="badge">ODS 8 · Meta 8.6</span>
          <h1>Seu primeiro emprego começa com pequenos passos digitais.</h1>
          <p>
            Um guia gratuito para jovens que querem organizar documentos, montar um currículo,
            praticar habilidades digitais básicas e se candidatar a vagas on-line com mais segurança.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#plano">
              Começar pelo plano <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="#checklist">
              Ver checklist
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Resumo do guia">
          <div className="spotlight" />
          <div className="mini-card main-card">
            <BriefcaseBusiness aria-hidden="true" />
            <strong>Preparação prática</strong>
            <span>Currículo, arquivos, e-mail e entrevistas on-line.</span>
          </div>
          <div className="mini-row">
            <div className="mini-card">
              <ShieldCheck aria-hidden="true" />
              <span>Busca segura</span>
            </div>
            <div className="mini-card burgundy">
              <CalendarCheck aria-hidden="true" />
              <span>Plano de 7 dias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningGrid() {
  return (
    <section id="habilidades" className="section-shell">
      <div className="section-heading">
        <span className="eyebrow">O que você vai aprender</span>
        <h2>Habilidades simples para se candidatar com mais confiança</h2>
      </div>
      <div className="bento-grid">
        {learningCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <a className={`bento-card card-${index + 1}`} href={card.href} key={card.title}>
              <Icon aria-hidden="true" />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span>
                Abrir seção <ArrowRight size={16} aria-hidden="true" />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function ProgressList({
  title,
  intro,
  items,
  storageKey,
  printButton,
}: {
  title: string;
  intro: string;
  items: Step[];
  storageKey: string;
  printButton?: boolean;
}) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const { checked, completed, toggle } = usePersistentChecklist(storageKey, ids);
  const percentage = Math.round((completed / items.length) * 100);

  return (
    <div className="progress-card">
      <div className="progress-top">
        <div>
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>
        {printButton ? (
          <button className="button secondary print-hide" type="button" onClick={() => window.print()}>
            <Printer size={18} aria-hidden="true" /> Imprimir checklist
          </button>
        ) : null}
      </div>
      <div className="progress-meter" aria-label={`${percentage}% concluído`}>
        <span style={{ width: `${percentage}%` }} />
      </div>
      <p className="progress-copy">
        {completed} de {items.length} itens concluídos
      </p>
      <div className="check-grid">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <label className="check-item" key={item.id}>
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={() => toggle(item.id)}
              />
              <span className="check-icon">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span>{item.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function SafeSearch() {
  return (
    <section id="busca-segura" className="section-shell split-section">
      <div className="section-heading">
        <span className="eyebrow">Busca segura de vagas</span>
        <h2>Procure oportunidades com atenção, sem medo</h2>
        <p>
          Nem toda mensagem urgente é uma oportunidade real. Alguns cuidados ajudam a evitar golpes,
          proteger dados pessoais e manter um registro organizado das candidaturas.
        </p>
      </div>
      <div className="safety-grid">
        <article className="safety-card warning">
          <AlertTriangle aria-hidden="true" />
          <h3>Sinais de alerta</h3>
          <ul>
            {redFlags.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="safety-card good">
          <CheckCircle2 aria-hidden="true" />
          <h3>Boas práticas</h3>
          <ul>
            {goodPractices.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section id="recursos" className="section-shell resources">
      <div className="section-heading">
        <span className="eyebrow">Recursos para continuar aprendendo</span>
        <h2>Escolha uma área e pratique aos poucos</h2>
        <p>Escolha uma habilidade para praticar aos poucos e avance no seu ritmo.</p>
      </div>
      <div className="resource-grid">
        {resourceCategories.map((resource) => (
          <article className="resource-card" key={resource.title}>
            <Sparkles size={18} aria-hidden="true" />
            <h3>{resource.title}</h3>
            <p>{resource.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="section-shell about">
      <div className="about-copy">
        <span className="eyebrow">Sobre o projeto</span>
        <h2>Uma mídia digital educativa de apoio ao primeiro emprego</h2>
        <p>
          O Primeiros Passos Digitais foi construído como parte do Projeto Integrado de Extensão III
          da UniDomBosco. A proposta apoia o ODS 8, Trabalho Decente e Crescimento Econômico, com
          conexão principal à Meta 8.6, voltada à redução da proporção de jovens sem emprego,
          educação ou formação.
        </p>
        <p>
          O recurso é gratuito e busca ajudar jovens a se prepararem para oportunidades iniciais por
          meio de orientações sobre currículo, e-mail profissional, documentos, planilhas, entrevistas
          por vídeo, busca de vagas e segurança digital.
        </p>
      </div>
      <aside className="sources" aria-label="Fontes do projeto">
        <h3>Fontes do relatório</h3>
        <ul>
          <li>
            <a href="https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/47222-cai-a-proporcao-de-jovens-que-nao-trabalham-nao-estudam-e-nem-se-qualificam">
              IBGE: Cai a proporção de jovens que não trabalham, não estudam e nem se qualificam.
            </a>
          </li>
          <li>
            <a href="https://cetic.br/media/docs/publicacoes/2/20250512115624/tic_domicilios_2024_resumo_executivo.pdf">
              CGI.br: TIC Domicílios 2024 - resumo executivo.
            </a>
          </li>
          <li>
            <a href="https://www.ipea.gov.br/ods/ods8.html">
              IPEA: ODS 8 - Trabalho Decente e Crescimento Econômico.
            </a>
          </li>
        </ul>
      </aside>
    </section>
  );
}

function App() {
  const year = new Date().getFullYear();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LearningGrid />
        <section id="plano" className="section-shell">
          <ProgressList
            title="Plano de 7 dias"
            intro="Um passo por dia para transformar o uso cotidiano do celular e do computador em preparo real para candidaturas."
            items={planSteps}
            storageKey="ppd-plano-7-dias"
          />
        </section>
        <section id="checklist" className="section-shell print-section">
          <ProgressList
            title="Checklist antes de se candidatar"
            intro="Use esta lista antes de enviar currículo, preencher formulários ou participar de uma entrevista on-line."
            items={checklistItems}
            storageKey="ppd-checklist-candidatura"
            printButton
          />
        </section>
        <SafeSearch />
        <Resources />
        <About />
      </main>
      <footer>
        <div>
          <strong>Primeiros Passos Digitais</strong>
          <span>Projeto Integrado de Extensão III — UniDomBosco</span>
          <span>{year}</span>
        </div>
        <nav aria-label="Links do rodapé">
          <a href="#inicio">Início</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#plano">Plano de 7 dias</a>
          <a href="#busca-segura">Busca segura</a>
          <a href="#recursos">Recursos</a>
          <a href="#sobre">Sobre</a>
        </nav>
      </footer>
    </>
  );
}

export default App;
