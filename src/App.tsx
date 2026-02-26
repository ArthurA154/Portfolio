import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { label: 'Start', href: '#top' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Kontakt', href: '#contact' },
];

type SkillIcon = {
  name: string;
  icon?: string;
  accent?: string;
};

type SkillBlock = {
  key: string;
  title: string;
  items: SkillIcon[];
};

// Easy add pattern:
// 1) Add a new block object for a full category
// 2) Add icons inside "items" with name + icon URL
const skillBlocks: SkillBlock[] = [
  {
    key: 'FE',
    title: 'Frontend',
    items: [
      { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031', accent: 'from-rose-400/25 to-red-500/10' },
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', accent: 'from-cyan-300/25 to-sky-500/10' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', accent: 'from-blue-300/25 to-blue-600/10' },
      { name: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', accent: 'from-cyan-300/25 to-cyan-600/10' },
    ],
  },
  {
    key: 'API',
    title: 'Backend & APIs',
    items: [
      { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E', accent: 'from-emerald-300/25 to-green-600/10' },
      { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37', accent: 'from-orange-300/25 to-orange-600/10' },
      { name: 'REST', accent: 'from-indigo-300/25 to-indigo-600/10' },
      { name: 'JSON', accent: 'from-slate-300/25 to-slate-600/10' },
    ],
  },
  {
    key: 'OPS',
    title: 'DevOps / Infrastructure',
    items: [
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032', accent: 'from-orange-300/25 to-red-600/10' },
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', accent: 'from-sky-300/25 to-blue-700/10' },
      { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/FFFFFF', accent: 'from-slate-300/20 to-slate-600/10' },
      { name: 'CI/CD', accent: 'from-violet-300/20 to-violet-600/10' },
    ],
  },
  {
    key: 'PBI',
    title: 'Process & Business IT',
    items: [
      { name: 'Requirements', accent: 'from-cyan-300/25 to-cyan-700/10' },
      { name: 'Workflows', accent: 'from-blue-300/25 to-blue-700/10' },
      { name: 'Stakeholders', accent: 'from-indigo-300/25 to-indigo-700/10' },
      { name: 'Delivery', accent: 'from-teal-300/25 to-teal-700/10' },
    ],
  },
  {
    key: 'AUTO',
    title: 'Automation / Exploration',
    items: [
      { name: 'Scripts', accent: 'from-lime-300/25 to-lime-700/10' },
      { name: 'AI Workflows', accent: 'from-fuchsia-300/25 to-fuchsia-700/10' },
      { name: 'Rapid Tests', accent: 'from-amber-300/25 to-amber-700/10' },
      { name: 'Tooling', accent: 'from-emerald-300/25 to-emerald-700/10' },
    ],
  },
];

const technicalWork = [
  {
    title: 'UI Motion Lab',
    label: 'Frontend Experiment',
    summary: 'Small interaction studies for transitions, hierarchy, and polished micro-feedback.',
  },
  {
    title: 'API Integration Sandbox',
    label: 'Backend Practice',
    summary: 'Practical tests around endpoint handling, response mapping, and clean data flow.',
  },
  {
    title: 'Automation Mini Tools',
    label: 'Workflow Build',
    summary: 'Lightweight scripts for repetitive tasks, setup speed, and daily dev support.',
  },
];

const TITLE_TEXT = 'Arthur Ablamitov';
const POSITIONING_TEXT = 'Business IT Focused on Frontend Systems, APIs, and Practical Automation.';
const QUOTE_TEXT = '"Clear systems. Clean execution."';

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 60,
    damping: 24,
    mass: 0.35,
  });

  const bgLayerOneY = useTransform(smoothScrollY, [0, 2200], [0, -160]);
  const bgLayerTwoY = useTransform(smoothScrollY, [0, 2200], [0, 120]);
  const gridLayerY = useTransform(smoothScrollY, [0, 2200], [0, -55]);
  const heroY = useTransform(smoothScrollY, [0, 700], [0, 72]);
  const heroOpacity = useTransform(smoothScrollY, [0, 520], [1, 0.38]);
  const heroScale = useTransform(smoothScrollY, [0, 700], [1, 0.98]);

  const [typedTitle, setTypedTitle] = useState('');
  const [typedPositioning, setTypedPositioning] = useState('');

  useEffect(() => {
    let mounted = true;
    let titleIndex = 0;
    let positioningIndex = 0;

    const typeTitle = () => {
      if (!mounted) return;
      if (titleIndex <= TITLE_TEXT.length) {
        setTypedTitle(TITLE_TEXT.slice(0, titleIndex));
        titleIndex += 1;
        window.setTimeout(typeTitle, 80);
        return;
      }
      window.setTimeout(typePositioning, 240);
    };

    const typePositioning = () => {
      if (!mounted) return;
      if (positioningIndex <= POSITIONING_TEXT.length) {
        setTypedPositioning(POSITIONING_TEXT.slice(0, positioningIndex));
        positioningIndex += 1;
        window.setTimeout(typePositioning, 20);
      }
    };

    const start = window.setTimeout(typeTitle, 180);

    return () => {
      mounted = false;
      window.clearTimeout(start);
    };
  }, []);

  const scrollToId = (id: string) => {
    const target = document.querySelector(id);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main
      ref={scrollRef}
      id="top"
      className="relative h-screen snap-y snap-proximity overflow-y-auto overflow-x-hidden scroll-smooth bg-[#070a12] text-slate-100"
    >
      <motion.div className="pointer-events-none fixed inset-0" style={{ y: bgLayerOneY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(56,189,248,0.24),transparent_36%),radial-gradient(circle_at_82%_8%,rgba(37,99,235,0.18),transparent_34%),linear-gradient(180deg,#070a12_0%,#06070d_100%)]" />
      </motion.div>

      <motion.div className="pointer-events-none fixed inset-0" style={{ y: bgLayerTwoY }}>
        <div className="absolute -left-24 top-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan-400/12 blur-[120px]" />
        <div className="absolute -right-16 top-[15%] h-[22rem] w-[22rem] rounded-full bg-blue-500/14 blur-[115px]" />
      </motion.div>

      <motion.div className="pointer-events-none fixed inset-0 grid-overlay opacity-[0.09]" style={{ y: gridLayerY }} />
      <div className="pointer-events-none fixed inset-0 noise-overlay opacity-[0.05]" />

      <motion.section
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 mx-auto grid h-screen w-full snap-start items-center px-6 md:max-w-7xl md:px-10"
      >
        <header className="absolute left-0 right-0 top-0 z-20">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10">
            <button onClick={() => scrollToId('#top')} className="text-xs font-semibold tracking-[0.24em] text-cyan-100/90">
              PLACEHOLDER NAME
            </button>

            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              {navItems.map((item) => (
                <button key={item.label} onClick={() => scrollToId(item.href)} className="transition duration-300 hover:text-cyan-100">
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => scrollToId('#work')}
              className="rounded-full border border-cyan-200/35 bg-cyan-400/15 px-4 py-2 text-xs font-medium text-cyan-50 transition duration-300 hover:bg-cyan-400/25"
            >
              Selected Work
            </button>
          </div>
        </header>

        <div className="max-w-6xl pt-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-xs uppercase tracking-[0.28em] text-cyan-100/70"
          >
            Personal Landing
          </motion.p>

          <h1 className="text-6xl font-semibold leading-[0.95] text-slate-50 sm:text-7xl lg:text-8xl xl:text-[10rem]">
            {typedTitle}
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              className="ml-2 inline-block h-[0.88em] w-[0.08em] bg-cyan-200/90 align-middle"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: typedTitle.length >= TITLE_TEXT.length ? 1 : 0.4 }}
            transition={{ duration: 0.5 }}
            className="mt-8 max-w-3xl text-xl text-slate-300/90 sm:text-2xl"
          >
            {typedPositioning}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: typedPositioning.length >= POSITIONING_TEXT.length ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-10 text-base tracking-wide text-cyan-100/80 sm:text-lg"
          >
            {QUOTE_TEXT}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-slate-400"
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-px bg-gradient-to-b from-cyan-100/70 to-transparent"
          />
        </motion.div>
      </motion.section>

      <section id="skills" className="relative z-10 mx-auto grid h-screen w-full snap-start items-center px-6 md:max-w-7xl md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">Skills</p>
          <h2 className="mt-3 text-5xl font-semibold text-slate-50 sm:text-6xl lg:text-7xl">Skill Systems</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillBlocks.map((group, index) => (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-cyan-300/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:border-cyan-200/25 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/10 blur-2xl" />
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/65">{group.key}</p>
                <h3 className="mt-2 text-2xl font-medium text-slate-50">{group.title}</h3>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  {group.items.map((item) => (
                    <div key={item.name} className="group flex flex-col items-center gap-2">
                      <div
                        className={`relative flex h-24 w-24 items-center justify-center border border-white/20 bg-gradient-to-br ${item.accent ?? 'from-cyan-300/20 to-blue-700/10'} shadow-[0_0_22px_rgba(56,189,248,0.16)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.26)] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]`}
                      >
                        {item.icon ? (
                          <img src={item.icon} alt={item.name} className="h-10 w-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                        ) : (
                          <span className="text-sm font-semibold tracking-wide text-cyan-100">{item.name.slice(0, 3).toUpperCase()}</span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-slate-300">{item.name}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="work" className="relative z-10 mx-auto grid h-screen w-full snap-start items-center px-6 md:max-w-7xl md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">Builds & Experiments</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-50 sm:text-5xl">Technical Work</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {technicalWork.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-100/65">{item.label}</p>
                <h3 className="mt-3 text-2xl font-medium text-slate-50">{item.title}</h3>
                <p className="mt-3 text-base text-slate-300/85">{item.summary}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="relative z-10 mx-auto grid h-screen w-full snap-start items-center px-6 md:max-w-7xl md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-3xl rounded-3xl border border-white/12 bg-gradient-to-br from-white/[0.05] to-cyan-300/[0.04] p-8 sm:p-10"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">Contact</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-50 sm:text-5xl">Let&apos;s Connect</h2>
          <p className="mt-4 text-base text-slate-300/85 sm:text-lg">
            Open for conversations about practical engineering, frontend systems, and business-oriented tech work.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cyan-200/35 bg-cyan-400/15 px-6 py-3 text-base font-medium text-cyan-50 transition duration-300 hover:bg-cyan-400/25"
            >
              LinkedIn
            </a>
            <a
              href="mailto:arthur.ablamitov@example.com"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-medium text-slate-100 transition duration-300 hover:bg-white/10"
            >
              Email
            </a>
          </div>

          <p className="mt-5 text-sm text-slate-400">GitHub link available on request.</p>
        </motion.div>
      </section>
    </main>
  );
}
