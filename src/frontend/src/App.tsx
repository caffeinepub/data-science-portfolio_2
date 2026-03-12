import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Brain,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Skill } from "./backend.d";
import {
  useEducation,
  useProfile,
  useProjects,
  useSkills,
} from "./hooks/useQueries";

// ──────────────────────────────────────────────
// Theme toggle
// ──────────────────────────────────────────────
function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

// ──────────────────────────────────────────────
// Data particles
// ──────────────────────────────────────────────
const DATA_SYMBOLS = [
  "01",
  "∑",
  "μ",
  "σ",
  "∂",
  "∫",
  "∞",
  "π",
  "λ",
  "β",
  "∇",
  "θ",
];

function DataParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    symbol: DATA_SYMBOLS[i % DATA_SYMBOLS.length],
    left: `${5 + ((i * 5.2) % 90)}%`,
    delay: i * 0.35,
    duration: 6 + (i % 4),
    size: 10 + (i % 3) * 4,
  }));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-mono text-primary/30 select-none"
          style={{ left: p.left, bottom: "0", fontSize: p.size }}
          animate={{ y: ["-10vh", "-110vh"], opacity: [0, 0.7, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// Scroll helper
// ──────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ──────────────────────────────────────────────
// Nav
// ──────────────────────────────────────────────
function Nav({
  dark,
  toggleTheme,
}: { dark: boolean; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "About", id: "about", ocid: "nav.about.link" },
    { label: "Projects", id: "projects", ocid: "nav.projects.link" },
    { label: "Skills", id: "skills", ocid: "nav.skills.link" },
    { label: "Education", id: "education", ocid: "nav.education.link" },
    { label: "Contact", id: "contact", ocid: "nav.contact.link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Alex<span className="text-primary">.chen</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              type="button"
              key={l.id}
              data-ocid={l.ocid}
              onClick={() => scrollTo(l.id)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-all"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  type="button"
                  key={l.id}
                  data-ocid={l.ocid}
                  onClick={() => {
                    scrollTo(l.id);
                    setMobileOpen(false);
                  }}
                  className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-all"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ──────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background layers */}
      <div className="absolute inset-0 hero-mesh" />
      <div className="absolute inset-0 grid-dot opacity-40" />
      <DataParticles />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-slow pointer-events-none" />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-chart-2/5 blur-3xl animate-pulse-slow pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-4 leading-none"
        >
          <span className="text-foreground">Alex </span>
          <span className="text-gradient">Chen</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xl sm:text-2xl text-primary mb-4 cursor-blink"
        >
          Data Science Student & ML Enthusiast
        </motion.p>

        {/* Bio snippet */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Turning raw data into meaningful insights. MS in Data Science @
          Stanford, focused on machine learning and NLP.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            data-ocid="hero.primary_button"
            size="lg"
            onClick={() => scrollTo("projects")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow font-semibold px-8 gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            View Projects
          </Button>
          <Button
            data-ocid="hero.secondary_button"
            size="lg"
            variant="outline"
            onClick={() => scrollTo("contact")}
            className="border-border hover:border-primary/50 hover:bg-primary/5 font-semibold px-8 gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: "4+", label: "Projects" },
            { value: "16+", label: "Skills" },
            { value: "2", label: "Degrees" },
            { value: "92%", label: "Best Accuracy" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-gradient">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="text-xs font-mono uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  );
}

// ──────────────────────────────────────────────
// About
// ──────────────────────────────────────────────
function About() {
  const { data: profile } = useProfile();

  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel icon={<Database className="w-4 h-4" />} text="About Me" />

        <div className="mt-12 grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-72 h-72 mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-chart-2/20 to-transparent blur-xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-primary/20 glow-border">
                <img
                  src="/assets/generated/alex-chen-profile.dim_400x400.jpg"
                  alt="Alex Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-xl">
                <div className="font-mono text-xs text-muted-foreground">
                  Current status
                </div>
                <div className="font-semibold text-sm text-primary mt-0.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open to work
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl font-bold mb-6">
              Hi, I'm <span className="text-gradient">Alex</span> 👋
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              {profile?.bio ??
                "Passionate about turning raw data into meaningful insights. Currently pursuing my MS in Data Science, with a focus on machine learning and NLP. I love building projects that solve real-world problems."}
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="w-4 h-4 text-primary" />
                Stanford University
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { v: "4+", l: "Projects" },
                { v: "16+", l: "Skills" },
                { v: "2", l: "Degrees" },
                { v: "3.92", l: "GPA" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/40 transition-colors"
                >
                  <div className="font-display text-2xl font-bold text-primary">
                    {s.v}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Projects
// ──────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  NLP: "bg-chart-1/15 text-chart-1 border-chart-1/30",
  "Machine Learning": "bg-chart-2/15 text-chart-2 border-chart-2/30",
  "Data Visualization": "bg-chart-3/15 text-chart-3 border-chart-3/30",
  Regression: "bg-chart-4/15 text-chart-4 border-chart-4/30",
};

function Projects() {
  const { data: projects = [], isLoading } = useProjects();

  return (
    <section id="projects" className="py-24 bg-muted/20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel icon={<Brain className="w-4 h-4" />} text="Projects" />
        <h2 className="font-display text-4xl font-bold mt-4 mb-3">
          Featured <span className="text-gradient">Work</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          Real-world projects across NLP, machine learning, and data
          visualization.
        </p>

        {isLoading ? (
          <div
            data-ocid="projects.loading_state"
            className="grid sm:grid-cols-2 gap-6"
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 bg-card border border-border rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div data-ocid="projects.list" className="grid sm:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project, i) => (
              <motion.div
                key={project.title}
                data-ocid={`projects.item.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-glow transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge
                    variant="outline"
                    className={`text-xs font-mono border ${
                      CATEGORY_COLORS[project.category] ??
                      "bg-muted/30 text-muted-foreground border-border"
                    }`}
                  >
                    {project.category}
                  </Badge>
                  <a
                    data-ocid={`projects.github.button.${i + 1}`}
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                    aria-label="View on GitHub"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground border border-border/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Skills
// ──────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: <Code2 className="w-4 h-4" />,
  "ML / AI": <Brain className="w-4 h-4" />,
  Visualization: <BarChart3 className="w-4 h-4" />,
  Tools: <Wrench className="w-4 h-4" />,
};

function SkillGroup({
  category,
  skills,
}: { category: string; skills: Skill[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-primary/15 text-primary">
          {CATEGORY_ICONS[category] ?? <Database className="w-4 h-4" />}
        </div>
        <h3 className="font-display font-bold text-lg">{category}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-xs font-mono text-primary">
                {Number(skill.proficiency)}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full skill-bar rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${Number(skill.proficiency)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Skills() {
  const { data: skills = [], isLoading } = useSkills();

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    acc[s.category] = [...(acc[s.category] ?? []), s];
    return acc;
  }, {});

  return (
    <section
      id="skills"
      data-ocid="skills.section"
      className="py-24 bg-background"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel icon={<Code2 className="w-4 h-4" />} text="Skills" />
        <h2 className="font-display text-4xl font-bold mt-4 mb-3">
          Technical <span className="text-gradient">Arsenal</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          Tools and technologies I've honed through coursework, research, and
          real projects.
        </p>

        {isLoading ? (
          <div
            data-ocid="skills.loading_state"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-72 bg-card border border-border rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(grouped).map(([cat, catSkills]) => (
              <SkillGroup key={cat} category={cat} skills={catSkills} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Education
// ──────────────────────────────────────────────
function Education() {
  const { data: edu = [], isLoading } = useEducation();

  return (
    <section
      id="education"
      data-ocid="education.section"
      className="py-24 bg-muted/20"
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel
          icon={<GraduationCap className="w-4 h-4" />}
          text="Education"
        />
        <h2 className="font-display text-4xl font-bold mt-4 mb-12">
          Academic <span className="text-gradient">Journey</span>
        </h2>

        {isLoading ? (
          <div data-ocid="education.loading_state" className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-card border border-border rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

            <div className="space-y-8">
              {edu.map((entry, i) => (
                <motion.div
                  key={entry.institution}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-5 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-glow" />

                  <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-display font-bold text-lg">
                          {entry.degree}
                        </h3>
                        <p className="text-primary font-medium text-sm">
                          {entry.institution}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="font-mono text-xs border-primary/30 text-primary bg-primary/10"
                      >
                        {Number(entry.year)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Contact
// ──────────────────────────────────────────────
function Contact() {
  const { data: profile } = useProfile();

  const links = [
    {
      ocid: "contact.github.link",
      href: profile?.github ?? "https://github.com/alexchen",
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      handle: "@alexchen",
      desc: "Check out my repositories",
    },
    {
      ocid: "contact.linkedin.link",
      href: profile?.linkedin ?? "https://linkedin.com/in/alexchen",
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      handle: "in/alexchen",
      desc: "Connect professionally",
    },
    {
      ocid: "contact.email.link",
      href: `mailto:${profile?.email ?? "alex.chen@datasci.edu"}`,
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      handle: profile?.email ?? "alex.chen@datasci.edu",
      desc: "Send me a message",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 hero-mesh opacity-50" />
      <div className="absolute inset-0 grid-dot opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <SectionLabel icon={<Mail className="w-4 h-4" />} text="Contact" />
        <h2 className="font-display text-4xl font-bold mt-4 mb-4">
          Let's <span className="text-gradient">Connect</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
          Whether it's a research collaboration, job opportunity, or just a data
          science chat — my inbox is open.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {links.map((link) => (
            <motion.a
              key={link.label}
              data-ocid={link.ocid}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-glow transition-all duration-300 flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary group-hover:bg-primary/25 transition-colors">
                {link.icon}
              </div>
              <div>
                <div className="font-display font-bold text-lg">
                  {link.label}
                </div>
                <div className="text-primary font-mono text-sm mt-1">
                  {link.handle}
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  {link.desc}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Footer
// ──────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-primary" />
          <span className="font-mono">Alex Chen — Data Science Portfolio</span>
        </div>
        <div>
          © {year}. Built with ❤️ using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────
// Shared: Section label
// ──────────────────────────────────────────────
function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono">
      {icon}
      {text}
    </div>
  );
}

// ──────────────────────────────────────────────
// App
// ──────────────────────────────────────────────
export default function App() {
  const { dark, toggle } = useTheme();

  // Apply dark class immediately on mount
  const initialized = useRef(false);
  if (!initialized.current) {
    document.documentElement.classList.toggle("dark", dark);
    initialized.current = true;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav dark={dark} toggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
