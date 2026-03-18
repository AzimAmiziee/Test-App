"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const projects = [
  {
    title: "Peneraju Website & Systems",
    category: "Public Platform + Internal Systems",
    description:
      "Worked on Yayasan Peneraju’s digital ecosystem, including the public-facing website and internal operational systems. Focused on improving usability, maintaining platform stability, enhancing workflows, and supporting scalable backend development using Laravel and PostgreSQL.",
    stack: ["Laravel", "PHP", "PostgreSQL", "JavaScript"],
    link: "https://peneraju.org",
    linkLabel: "Visit Website",
    note: "Includes public-facing platform and private internal systems.",
  },
  {
    title: "GPMS",
    category: "Enterprise In-House System",
    description:
      "Contributed to the enhancement of GPMS, an internal enterprise platform used for business operations. Built and refined modules, improved frontend responsiveness, and supported backend and database logic to make workflows more efficient and structured.",
    stack: ["Angular", "Tailwind CSS", ".NET", "SQL Server"],
    link: null,
    linkLabel: null,
    note: "Private in-house system. Screenshots are not publicly shareable.",
  },
  {
    title: "MIS System",
    category: "Management Information System",
    description:
      "Developed and improved internal MIS features to support reporting, data handling, and process efficiency. Worked across frontend and backend layers, including UI improvements, business logic, and database optimization.",
    stack: ["React.js", ".NET", "ASP.NET Core", "SQL Server"],
    link: null,
    linkLabel: null,
    note: "Private in-house system. Screenshots are not publicly shareable.",
  },
  {
    title: "Led Vision Website",
    category: "Internship Project",
    description:
      "Supported the enhancement of the company website during internship, including content updates, UI improvements, and SEO-related work. Also explored automation support using Excel Macros and Visual Basic for internal productivity tasks.",
    stack: ["WordPress", "SEO", "Excel VBA", "Visual Basic"],
    link: "https://ledvision.com.my/",
    linkLabel: "Visit Website",
    note: "Public-facing website from internship period.",
  },
];

const strengths = [
  "Full-stack web development",
  "Enterprise internal systems",
  "Laravel & PHP backend development",
  "React / Angular frontend work",
  ".NET application development",
  "Database design & optimization",
  "Workflow improvement & automation",
  "Business-focused software solutions",
];

export default function Home() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    const activateCursor = () => setCursorActive(true);
    const deactivateCursor = () => setCursorActive(false);

    window.addEventListener("mousemove", moveCursor);

    const hoverTargets = document.querySelectorAll("a, button, .hover-target");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", activateCursor);
      el.addEventListener("mouseleave", deactivateCursor);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", activateCursor);
        el.removeEventListener("mouseleave", deactivateCursor);
      });
    };
  }, []);

  return (
    <div className={styles.page}>
      <div
        className={`${styles.cursor} ${cursorActive ? styles.cursorActive : ""}`}
        style={{
          transform: `translate(${cursor.x}px, ${cursor.y}px)`,
        }}
      />
      <div className={styles.grid}></div>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.badge}>Software Developer</div>

            <h1 className={styles.title}>
              Building software
              <br />
              <span>that looks clean and works hard.</span>
            </h1>

            <p className={styles.description}>
              I’m Azim Amizie, a software developer focused on building reliable
              web applications, scalable systems, and practical internal tools
              that improve real business operations.
            </p>

            <div className={styles.actions}>
              <a href="#projects" className={styles.primaryBtn}>
                View Projects
              </a>
              <a
                href="mailto:itsayeazim@gmail.com"
                className={styles.secondaryBtn}
              >
                Contact Me
              </a>
            </div>

            <div className={styles.quickInfo}>
              <div className={styles.infoCard}>
                <span>Current Focus</span>
                <strong>Laravel, React, .NET, SQL</strong>
              </div>
              <div className={styles.infoCard}>
                <span>LinkedIn</span>
                <strong>
                  <a
                    href="https://www.linkedin.com/in/azim-amizie-94a696295/"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.inlineLink}
                  >
                    Azim-Amizie LinkedIn
                  </a>
                </strong>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.imageCard}>
              <div className={styles.imageWrap}>
                <Image
                  src="/azim.png"
                  alt="Azim Amizie"
                  fill
                  className={styles.profileImage}
                  priority
                />
              </div>

              <div className={styles.imageOverlay}>
                <p>Azim Amizie</p>
                <span>Software Developer</span>
              </div>
            </div>

            <div className={styles.floatingCard}>
              <span className={styles.floatingLabel}>Selected Stack</span>
              <strong>Laravel • React • Angular • .NET • PostgreSQL</strong>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTop}>
            <div>
              <span className={styles.sectionLabel}>About</span>
              <h2 className={styles.sectionTitle}>What I do</h2>
            </div>
          </div>

          <div className={styles.aboutGrid}>
            <div className={styles.aboutCard}>
              <p>
                I build software with a strong focus on clarity, maintainability,
                and real-world usefulness. My experience includes public-facing
                platforms, internal enterprise systems, workflow improvements,
                and backend-driven applications that support daily operations.
              </p>
            </div>

            <div className={styles.strengthGrid}>
              {strengths.map((item) => (
                <div key={item} className={styles.strengthItem}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="projects">
          <div className={styles.sectionTop}>
            <div>
              <span className={styles.sectionLabel}>Portfolio</span>
              <h2 className={styles.sectionTitle}>Selected Projects</h2>
            </div>
            <p className={styles.sectionIntro}>
              A curated view of the platforms and systems I’ve worked on. Public
              projects are linked directly, while private systems are presented
              through scope, technical responsibilities, and engineering impact.
            </p>
          </div>

          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <article key={project.title} className={`${styles.projectCard} hover-target`}>
                <div>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.techList}>
                    {project.stack.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.projectBottom}>
                  <p className={styles.projectNote}>{project.note}</p>

                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.projectLink}
                    >
                      {project.linkLabel}
                    </a>
                  ) : (
                    <span className={styles.projectPrivate}>Private Project</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.contactCard}>
            <div>
              <span className={styles.sectionLabel}>Contact</span>
              <h2 className={styles.sectionTitle}>Let’s build something great</h2>
              <p className={styles.sectionIntro}>
                I’m open to software development opportunities, engineering
                collaborations, and impactful digital projects.
              </p>
            </div>

            <div className={styles.contactActions}>
              <a href="mailto:itsayeazim@gmail.com" className={styles.primaryBtn}>
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/azim-amizie-94a696295/"
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryBtn}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}