"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

/* ─── DATA ─── */
const projects = [
  {
    num: "01",
    cat: "Public Platform + Internal Systems",
    title: "Peneraju Website & Systems",
    desc: "Full digital ecosystem for Yayasan Peneraju — public-facing website and internal operational systems. Improved usability, platform stability, and backend scalability using Laravel and PostgreSQL.",
    stack: ["Laravel", "PHP", "PostgreSQL", "JavaScript"],
    link: "https://peneraju.org",
    linkLabel: "Visit Site →",
  },
  {
    num: "02",
    cat: "Enterprise In-House System",
    title: "GPMS",
    desc: "Built and refined modules for an internal enterprise platform. Improved frontend responsiveness, backend logic, and database structure to streamline business operations at scale.",
    stack: ["Angular", "Tailwind CSS", ".NET", "SQL Server"],
    link: null,
    linkLabel: null,
  },
  {
    num: "03",
    cat: "Management Information System",
    title: "MIS System",
    desc: "Developed and enhanced internal MIS features for reporting, data handling, and process efficiency. Worked across UI, business logic, and database optimization layers.",
    stack: ["React.js", ".NET", "ASP.NET Core", "SQL Server"],
    link: null,
    linkLabel: null,
  },
  {
    num: "04",
    cat: "Internship Project",
    title: "Led Vision Website",
    desc: "Enhanced the company website — content updates, UI improvements, and SEO. Also built Excel Macro automation tools to improve internal productivity workflows.",
    stack: ["WordPress", "SEO", "Excel VBA", "Visual Basic"],
    link: "https://ledvision.com.my/",
    linkLabel: "Visit Site →",
  },
];

const skills = [
  { n: "01", title: "Full-Stack Dev", body: "End-to-end ownership from schema design to polished, responsive UI." },
  { n: "02", title: "Laravel & PHP", body: "Robust APIs, auth flows, and scalable backend architecture." },
  { n: "03", title: "React & Angular", body: "Component-driven frontends with solid state management and clean UX." },
  { n: "04", title: ".NET Development", body: "ASP.NET Core APIs and enterprise modules integrated with SQL Server." },
  { n: "05", title: "Database Design", body: "Optimised schemas, efficient queries, and performance tuning at scale." },
  { n: "06", title: "Enterprise Systems", body: "Complex internal platforms with multi-role access and reporting." },
  { n: "07", title: "Platform Stability", body: "Monitoring, legacy improvements, and iterative enhancement of live systems." },
  { n: "08", title: "Automation", body: "Removing bottlenecks — from VBA macros to full workflow tooling." },
];

const stackChips = ["Laravel", "PHP", "React.js", "Angular", ".NET Core", "ASP.NET", "PostgreSQL", "SQL Server", "Tailwind CSS", "JavaScript", "TypeScript", "Excel VBA"];

const CODE_LINES = [
  "const dev = new Developer();",
  "dev.set('name', 'Azim Amizie');",
  "dev.set('stack', ['Laravel','React','.NET']);",
  "dev.set('focus', 'scalable systems');",
  "await dev.ship(project);",
  "// ✓ Build succeeded",
  "function solve(problem) {",
  "  return cleanCode(problem);",
  "}",
  "SELECT * FROM solutions",
  "WHERE quality = 'high';",
  "git commit -m 'ship it'",
  "npm run build ✓",
  "docker compose up -d",
  "<Component render={flawlessly} />",
];

/* ─── CANVAS HOOK ─── */
function useCodeCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let animId;

    let particles = [];
    let nodes = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initNodes();
    }

    function initNodes() {
      nodes = [];
      const gap = 90;
      for (let x = 0; x < W + gap; x += gap) {
        for (let y = 0; y < H + gap; y += gap) {
          nodes.push({
            x,
            y,
            pulse: 0,
            phase: Math.random() * Math.PI * 2,
            active: Math.random() > 0.7,
          });
        }
      }
    }

    function spawnParticle() {
      particles.push({
        x: Math.random() * W,
        y: H + 20,
        speed: Math.random() * 0.6 + 0.2,
        text: CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)],
        opacity: Math.random() * 0.18 + 0.04,
        size: Math.floor(Math.random() * 3) + 10,
        hue: Math.random() > 0.7 ? 20 : 0,
      });
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);

      const gap = 90;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W + gap; x += gap) {
        for (let y = 0; y < H + gap; y += gap) {
          const a = 0.03 + 0.02 * Math.sin(t * 0.0008 + x * 0.01 + y * 0.01);
          ctx.strokeStyle = `rgba(232,96,34,${a})`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + gap, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + gap);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.001 + n.phase);
        const a = n.active ? 0.12 * pulse : 0.04;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.active ? 2 + pulse : 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,96,34,${a})`;
        ctx.fill();
      }

      if (Math.random() < 0.025) spawnParticle();
      ctx.font = "13px 'DM Mono', monospace";
      particles = particles.filter((p) => p.y > -30);
      for (const p of particles) {
        p.y -= p.speed;
        const r = p.hue > 0 ? 232 : 255;
        const g = p.hue > 0 ? 96 : 255;
        const b = p.hue > 0 ? 34 : 255;
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.font = `${p.size}px 'DM Mono', monospace`;
        ctx.fillText(p.text, p.x, p.y);
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* ─── REVEAL HOOK ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            const delay = el.dataset.delay || "0";
            setTimeout(() => el.classList.add(styles.revealOn), parseInt(delay, 10));
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── TYPEWRITER ─── */
function useTypewriter(phrases, speed = 60, pause = 1800) {
  const [text, setText] = useState("");
  const [pIdx, setPIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const phrase = phrases[pIdx];
    if (typing) {
      if (text.length < phrase.length) {
        const t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), speed / 2);
        return () => clearTimeout(t);
      } else {
        setTyping(true);
        setPIdx((i) => (i + 1) % phrases.length);
      }
    }
  }, [text, typing, pIdx, phrases, speed, pause]);

  return text;
}

/* ─── CURSOR ─── */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    const animRing = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      raf = requestAnimationFrame(animRing);
    };

    const onEnter = () => setHov(true);
    const onLeave = () => setHov(false);

    window.addEventListener("mousemove", onMove);
    animRing();

    const targets = document.querySelectorAll("a,button,.hoverTarget");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`${styles.curDot} ${hov ? styles.curDotHov : ""}`} />
      <div ref={ringRef} className={`${styles.curRing} ${hov ? styles.curRingHov : ""}`} />
    </>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  const canvasRef = useRef(null);
  useCodeCanvas(canvasRef);
  useReveal();

  const typed = useTypewriter([
    "Software Developer",
    "Full-Stack Engineer",
    "Laravel Specialist",
    "React Developer",
    ".NET Builder",
  ]);

  const [navActive, setNavActive] = useState("about");

  useEffect(() => {
    const sections = ["about", "skills", "projects", "contact"];
    const handler = () => {
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && y >= el.offsetTop) {
          setNavActive(sections[i]);
          return;
        }
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className={styles.page}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <Cursor />

      <nav className={styles.nav}>
        <a href="#" className={styles.navLogo}>
          AA<span>.</span>
        </a>
        <div className={styles.navPill}>
          {["about", "skills", "projects"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`${styles.navLink} ${navActive === id ? styles.navLinkActive : ""}`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
        <a href="mailto:itsayeazim@gmail.com" className={styles.navCta}>
          Contact Me
        </a>
      </nav>

      <section className={styles.hero}>
        <div className={`${styles.heroBadge} ${styles.reveal}`} data-reveal data-delay="0">
          <span className={styles.badgeDot} />
          Available for New Opportunities
        </div>

        <h1 className={`${styles.heroTitle} ${styles.reveal}`} data-reveal data-delay="100">
          Building Software
          <br />
          <span className={styles.heroTitleGhost}>That Works.</span>
        </h1>

        <div className={`${styles.heroTyped} ${styles.reveal}`} data-reveal data-delay="200">
          <span className={styles.typedText}>{typed}</span>
          <span className={styles.cursor}>|</span>
        </div>

        <p className={`${styles.heroDesc} ${styles.reveal}`} data-reveal data-delay="300">
          I'm <strong>Azim Amizie</strong> — a full-stack developer building reliable web apps,
          scalable enterprise systems, and tools that move businesses forward.
        </p>

        <div className={`${styles.heroActions} ${styles.reveal}`} data-reveal data-delay="400">
          <a href="#projects" className={styles.btnMain}>
            View My Projects →
          </a>
          <a href="mailto:itsayeazim@gmail.com" className={styles.btnGhost}>
            Get In Touch
          </a>
        </div>

        <div className={`${styles.terminal} ${styles.reveal}`} data-reveal data-delay="500">
          <div className={styles.terminalBar}>
            <span className={styles.termDot} style={{ background: "#ff5f57" }} />
            <span className={styles.termDot} style={{ background: "#febc2e" }} />
            <span className={styles.termDot} style={{ background: "#28c840" }} />
            <span className={styles.termTitle}>azim@dev ~ portfolio</span>
          </div>
          <div className={styles.terminalBody}>
            <p>
              <span className={styles.termPrompt}>$</span> whoami
            </p>
            <p className={styles.termOut}>Azim Amizie · Software Developer · Malaysia</p>
            <p>
              <span className={styles.termPrompt}>$</span> cat stack.txt
            </p>
            <p className={styles.termOut}>Laravel · React · Angular · .NET · PostgreSQL</p>
            <p>
              <span className={styles.termPrompt}>$</span> git status
            </p>
            <p className={styles.termGreen}>✓ On branch main · Ready to ship</p>
            <p className={styles.termCaret}>
              <span className={styles.termPrompt}>$</span> <span className={styles.termBlink}>_</span>
            </p>
          </div>
        </div>

        <div className={`${styles.scrollHint} ${styles.reveal}`} data-reveal data-delay="600">
          <div className={styles.scrollLine} />
          <span>Scroll</span>
        </div>
      </section>

      <section className={styles.section} id="about">
        <div className={styles.wrap}>
          <div className={`${styles.secHeader} ${styles.reveal}`} data-reveal>
            <div className={styles.secLbl}>✦ About Me</div>
            <h2 className={styles.secTitle}>
              Fast, Reliable &
              <br />
              Made to Last
            </h2>
            <p className={styles.secSub}>
              Full-stack development with a focus on clarity, performance, and business impact — from public platforms to complex internal systems.
            </p>
          </div>

          <div className={styles.aboutGrid}>
            {[
              {
                n: "01",
                t: "Who I Am",
                body: (
                  <>
                    I build software with a strong focus on <strong>clarity, maintainability, and real-world usefulness</strong>. My experience spans public-facing platforms, enterprise internal systems, and backend-driven applications that support daily operations at scale.
                    <br />
                    <br />
                    Equally comfortable on <strong>frontend and backend</strong>, I bridge the gap between great UX and solid engineering.
                  </>
                ),
              },
              {
                n: "02",
                t: "What I Use",
                body: (
                  <>
                    <p style={{ marginBottom: 20 }}>
                      My core stack spans modern frameworks, robust backends, and scalable databases — chosen for each project based on what&apos;s right for the job.
                    </p>
                    <div className={styles.chips}>
                      {stackChips.map((c) => (
                        <span key={c} className={`${styles.chip} hoverTarget`}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </>
                ),
              },
              {
                n: "03",
                t: "How I Work",
                body: (
                  <>
                    I prioritise <strong>clean architecture</strong>, thoughtful UX decisions, and code that scales. Whether it&apos;s a high-traffic public platform or a complex internal management system, I bring the same care and precision to every layer.
                  </>
                ),
              },
              {
                n: "04",
                t: "Let's Connect",
                body: (
                  <>
                    <p style={{ marginBottom: 24 }}>
                      <strong>Based in Malaysia</strong> — open to remote and on-site roles. Currently available for new opportunities, collaborations, and impactful digital projects.
                    </p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <a href="mailto:itsayeazim@gmail.com" className={styles.btnMain} style={{ fontSize: 13, padding: "11px 22px" }}>
                        Email Me
                      </a>
                      <a
                        href="https://www.linkedin.com/in/azim-amizie-94a696295/"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnGhost}
                        style={{ fontSize: 13, padding: "11px 22px" }}
                      >
                        LinkedIn →
                      </a>
                    </div>
                  </>
                ),
              },
            ].map((card, i) => (
              <div key={card.n} className={`${styles.ac} ${styles.reveal} hoverTarget`} data-reveal data-delay={`${i * 80}`}>
                <div className={styles.acNum}>{card.n}</div>
                <div className={styles.acTitle}>{card.t}</div>
                <div className={styles.acBody}>{card.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="skills">
        <div className={styles.wrap}>
          <div className={`${styles.secHeader} ${styles.reveal}`} data-reveal>
            <div className={styles.secLbl}>✦ Expertise</div>
            <h2 className={styles.secTitle}>Core Strengths</h2>
            <p className={styles.secSub}>
              Eight areas where I consistently deliver the most value — from architecture to final delivery.
            </p>
          </div>
          <div className={styles.skillsGrid}>
            {skills.map((s, i) => (
              <div key={s.n} className={`${styles.sk} ${styles.reveal} hoverTarget`} data-reveal data-delay={`${i * 55}`}>
                <div className={styles.skN}>{s.n}</div>
                <div className={styles.skTitle}>{s.title}</div>
                <div className={styles.skBody}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="projects">
        <div className={styles.wrap}>
          <div className={`${styles.secHeader} ${styles.reveal}`} data-reveal>
            <div className={styles.secLbl}>✦ Portfolio</div>
            <h2 className={styles.secTitle}>Selected Projects</h2>
            <p className={styles.secSub}>
              Public platforms linked directly. Private enterprise systems documented by scope and engineering impact.
            </p>
          </div>
          <div className={styles.projList}>
            {projects.map((p, i) => (
              <div key={p.num} className={`${styles.pr} ${styles.reveal} hoverTarget`} data-reveal data-delay={`${i * 80}`}>
                <div className={styles.prNum}>{p.num}</div>
                <div className={styles.prBody}>
                  <div className={styles.prCat}>{p.cat}</div>
                  <div className={styles.prName}>{p.title}</div>
                  <div className={styles.prDesc}>{p.desc}</div>
                </div>
                <div className={styles.prTags}>
                  {p.stack.map((t) => (
                    <div key={t} className={styles.prTag}>
                      {t}
                    </div>
                  ))}
                </div>
                <div className={styles.prAct}>
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noreferrer" className={styles.prLink}>
                      {p.linkLabel}
                    </a>
                  ) : (
                    <div className={styles.prPriv}>Private System</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="contact">
        <div className={styles.wrap}>
          <div className={`${styles.contactBox} ${styles.reveal}`} data-reveal>
            <div className={styles.cl}>
              <div className={styles.cOver}>✦ Contact</div>
              <h2 className={styles.cTitle}>
                Let&apos;s Build
                <br />
                <em>Something Great</em>
              </h2>
              <p className={styles.cBody}>
                Open to software development opportunities, engineering collaborations, and impactful digital projects. If you have something in mind, I&apos;d love to hear it.
              </p>
              <div className={styles.cBtns}>
                <a href="mailto:itsayeazim@gmail.com" className={styles.btnMain}>
                  Email Me →
                </a>
                <a href="https://www.linkedin.com/in/azim-amizie-94a696295/" target="_blank" rel="noreferrer" className={styles.btnGhost}>
                  LinkedIn
                </a>
              </div>
            </div>
            <div className={styles.cr}>
              <div className={styles.crows}>
                {[
                  { l: "Email", v: "itsayeazim@gmail.com", href: "mailto:itsayeazim@gmail.com" },
                  { l: "LinkedIn", v: "Azim Amizie →", href: "https://www.linkedin.com/in/azim-amizie-94a696295/" },
                  { l: "Location", v: "Malaysia", href: null },
                  { l: "Stack", v: "Laravel · React · .NET", href: null },
                  { l: "Status", v: null, href: null, avail: true },
                ].map((row) => (
                  <div key={row.l} className={styles.crow}>
                    <span className={styles.crowL}>{row.l}</span>
                    {row.avail ? (
                      <span className={styles.crowV}>
                        <span className={styles.availDot} /> Available
                      </span>
                    ) : row.href ? (
                      <a
                        href={row.href}
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className={styles.crowV}
                      >
                        {row.v}
                      </a>
                    ) : (
                      <span className={styles.crowV}>{row.v}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footCopy}>
          © 2024 Azim Amizie<span>.</span> All rights reserved.
        </div>
        <div className={styles.footR}>Built with precision · KL, Malaysia</div>
      </footer>
    </div>
  );
}
