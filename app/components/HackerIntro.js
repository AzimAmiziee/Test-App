"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import styles from "../intro.module.css";

/* ────────────────────────────────────────────────────────────
   UTILITIES
──────────────────────────────────────────────────────────── */

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/* ────────────────────────────────────────────────────────────
   COMMAND SEQUENCE
   Each entry shape:
     type      — 'cmd' | 'response' | 'responseGreen' | 'warn'
                 'error' | 'dataField' | 'header' | 'granted'
                 'blank' | 'progress'
     text      — string (displayed text)
     speed     — ms per character (typed lines only; omit = instant)
     delay     — pause BEFORE this item (ms)
──────────────────────────────────────────────────────────── */
const SEQUENCE = [
  // ── Boot header ──────────────────────────────────────────
  { type: "header",        text: "AZIM_OS  ·  KERNEL 2.4.1  ·  SECURE SHELL",  delay: 0 },
  { type: "blank",         delay: 60 },

  // ── Phase 1: Init ─────────────────────────────────────────
  { type: "cmd",           text: "> initializing runtime environment...",        speed: 44, delay: 180 },
  { type: "response",      text: "  [OK] kernel loaded successfully",            delay: 55 },
  { type: "response",      text: "  [OK] memory mapped: 32768MB",                delay: 38 },
  { type: "response",      text: "  [OK] entropy pool: seeded",                  delay: 32 },
  { type: "blank",         delay: 110 },

  // ── Phase 2: Scan ─────────────────────────────────────────
  { type: "cmd",           text: "> scanning host environment...",               speed: 40, delay: 140 },
  { type: "response",      text: "  [OK] connection: ESTABLISHED",               delay: 90 },
  { type: "response",      text: "  [OK] origin: Kuala Lumpur, MY",              delay: 50 },
  { type: "response",      text: "  [OK] coordinates: 3.139° N · 101.687° E",   delay: 38 },
  { type: "response",      text: "  [OK] latency: 8ms · signal: STRONG",         delay: 42 },
  { type: "blank",         delay: 120 },

  // ── Phase 3: Auth bypass (tension) ────────────────────────
  { type: "cmd",           text: "> bypassing authentication layer...",          speed: 37, delay: 180 },
  { type: "warn",          text: "  [WARN] firewall barrier detected",           delay: 460 },
  { type: "warn",          text: "  [WARN] initiating counter-measure override", delay: 260 },
  { type: "error",         text: "  [ERR]  access denied · retry [1/3]",         delay: 720 },
  { type: "error",         text: "  [ERR]  access denied · retry [2/3]",         delay: 360 },
  { type: "responseGreen", text: "  [OK]   authentication bypassed ✓",           delay: 800 },
  { type: "blank",         delay: 170 },

  // ── Phase 4: Profile decrypt ──────────────────────────────
  { type: "cmd",           text: "> decrypting identity profile...",             speed: 38, delay: 140 },
  { type: "response",      text: "  ···",                                         delay: 580 },
  { type: "dataField",     text: "  IDENTITY  ·  AZIM AMIZIE",                   delay: 190 },
  { type: "dataField",     text: "  ROLE      ·  Full-Stack Software Developer",  delay: 70 },
  { type: "dataField",     text: "  STACK     ·  Laravel · React · .NET · Next.js", delay: 62 },
  { type: "dataField",     text: "  LOCATION  ·  Malaysia  ·  Available Remote",  delay: 58 },
  { type: "dataField",     text: "  CLEARANCE ·  LEVEL 5 — UNRESTRICTED ACCESS",  delay: 72 },
  { type: "blank",         delay: 210 },

  // ── Phase 5: Climax ───────────────────────────────────────
  { type: "cmd",           text: "> loading portfolio mainframe...",             speed: 34, delay: 110 },
  { type: "blank",         delay: 280 },
  { type: "progress",      delay: 80 },
  { type: "blank",         delay: 580 },
  { type: "granted",       text: "   ▸  ACCESS GRANTED",                         speed: 62, delay: 180 },
];

/* ────────────────────────────────────────────────────────────
   PROGRESS BAR
──────────────────────────────────────────────────────────── */
function ProgressBar({ progress }) {
  const BARS   = 30;
  const filled = Math.round(progress * BARS);
  const pct    = Math.round(progress * 100);
  return (
    <span>
      {"  loading  "}
      <span className={styles.progressFilled}>{"█".repeat(filled)}</span>
      <span className={styles.progressEmpty}>{"░".repeat(BARS - filled)}</span>
      {" "}
      <span className={styles.progressPct}>{String(pct).padStart(3, "\u00A0")}%</span>
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
   LINE RENDERER  (memoised — only progress lines re-render
   during the progress-bar animation loop)
──────────────────────────────────────────────────────────── */

// Map sequence types to CSS module class names
const TYPE_CLASS = {
  header:        styles.lineHeader,
  cmd:           styles.lineCmd,
  response:      styles.lineResponse,
  responseGreen: styles.lineResponseGreen,
  warn:          styles.lineWarn,
  error:         styles.lineError,
  dataField:     styles.lineDataField,
  granted:       styles.lineGranted,
  progress:      styles.lineProgress,
};

const Line = memo(function Line({ line, progress }) {
  if (line.type === "blank") return <div className={styles.lineSpacer} />;

  if (line.type === "progress") {
    return (
      <div className={`${styles.line} ${styles.lineProgress}`}>
        <ProgressBar progress={progress} />
      </div>
    );
  }

  return (
    <div className={`${styles.line} ${TYPE_CLASS[line.type] || ""}`}>
      {line.text}
    </div>
  );
});

/* ────────────────────────────────────────────────────────────
   HACKER INTRO
   Props:
     onTransition  — called when exit animation BEGINS
                     (parent can start fading in portfolio)
     onDone        — called when exit animation COMPLETES
                     (parent removes this component from DOM)
──────────────────────────────────────────────────────────── */
export default function HackerIntro({ onTransition, onDone }) {
  const [lines,       setLines]       = useState([]);
  const [typing,      setTyping]      = useState(null);  // { text, type } — partial line
  const [phase,       setPhase]       = useState("boot"); // boot|running|waiting|exiting
  const [progress,    setProgress]    = useState(0);
  const [showContinue,setShowContinue]= useState(false);
  const [glitchFull,  setGlitchFull]  = useState(false); // full-screen flash
  const [glitchTerm,  setGlitchTerm]  = useState(false); // terminal shake
  const [tick,        setTick]        = useState(0);     // forces clock redraw

  const cancelRef   = useRef(false);
  const bottomRef   = useRef(null);
  const termBodyRef = useRef(null);

  /* ── Clock ticker (top-left decorative timestamp) ──────── */
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Auto-scroll terminal body to bottom ──────────────── */
  useEffect(() => {
    const el = termBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing]);

  /* ── Glitch helper ─────────────────────────────────────── */
  const triggerGlitch = useCallback(async (ms = 600) => {
    setGlitchFull(true);
    setGlitchTerm(true);
    await sleep(ms * 0.5);
    setGlitchFull(false);
    await sleep(ms * 0.5);
    setGlitchTerm(false);
  }, []);

  /* ── Add a completed line ──────────────────────────────── */
  const addLine = useCallback((line) => {
    setLines((prev) => [...prev, line]);
  }, []);

  /* ── Main sequence engine ──────────────────────────────── */
  useEffect(() => {
    cancelRef.current = false;

    const run = async () => {
      await sleep(380);      // brief boot pause
      setPhase("running");

      for (const cmd of SEQUENCE) {
        if (cancelRef.current) return;

        // ── Pre-render delay ──
        if (cmd.delay) {
          await sleep(cmd.delay);
          if (cancelRef.current) return;
        }

        // ── BLANK ──────────────────────────────────────────
        if (cmd.type === "blank") {
          addLine({ type: "blank", text: "" });
          continue;
        }

        // ── PROGRESS BAR ───────────────────────────────────
        if (cmd.type === "progress") {
          addLine({ type: "progress", text: "" });
          const STEPS = 45;
          for (let i = 0; i <= STEPS; i++) {
            if (cancelRef.current) return;
            setProgress(i / STEPS);
            // Ease curve: slow-fast-slow
            const t   = i / STEPS;
            const eased = Math.sin(t * Math.PI);
            const ms  = 20 + (1 - eased) * 30 + Math.random() * 20;
            await sleep(Math.max(14, ms));
          }
          continue;
        }

        // ── INSTANT (no typing animation) ──────────────────
        if (!cmd.speed) {
          addLine({ type: cmd.type, text: cmd.text });
          // Brief glitch flash on error lines for tension
          if (cmd.type === "error") triggerGlitch(320);
          continue;
        }

        // ── TYPED (character by character) ─────────────────
        for (let i = 0; i <= cmd.text.length; i++) {
          if (cancelRef.current) return;
          setTyping({ text: cmd.text.slice(0, i), type: cmd.type });
          // Realistic variance: slight pause on punctuation
          const ch      = cmd.text[i - 1];
          const isPunct = ch === "." || ch === ">" || ch === ",";
          const jitter  = cmd.speed * 0.45;
          const delay   = cmd.speed
            + (Math.random() * jitter * 2 - jitter)
            + (isPunct ? 55 : 0);
          await sleep(Math.max(16, delay));
        }
        setTyping(null);
        addLine({ type: cmd.type, text: cmd.text });

        // ── GRANTED: glitch → show continue hint ───────────
        if (cmd.type === "granted") {
          await sleep(320);
          await triggerGlitch(950); // big cinematic glitch
          await sleep(280);
          setShowContinue(true);
          setPhase("waiting");
        }
      }
    };

    run();
    return () => { cancelRef.current = true; };
  }, [addLine, triggerGlitch]);

  /* ── Continue / skip handler ───────────────────────────── */
  const handleContinue = useCallback(() => {
    if (cancelRef.current) return;
    cancelRef.current = true;
    setPhase("exiting");
    setGlitchFull(true);
    onTransition?.();                          // portfolio begins fading in
    setTimeout(() => {
      setGlitchFull(false);
      onDone?.();                              // intro removed from DOM
    }, 860);
  }, [onTransition, onDone]);

  /* ── Keyboard: ENTER = continue ────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" && phase === "waiting") handleContinue();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, handleContinue]);

  /* ── Decorative clock ──────────────────────────────────── */
  const now = new Date();
  const ts  = [
    now.getHours().toString().padStart(2, "0"),
    now.getMinutes().toString().padStart(2, "0"),
    now.getSeconds().toString().padStart(2, "0"),
  ].join(":");

  /* ────────────────────────────────────────────────────────
     RENDER
  ──────────────────────────────────────────────────────── */
  return (
    <div className={`${styles.intro} ${phase === "exiting" ? styles.introExiting : ""}`}>

      {/* ── Ambient depth layers ─────────────────────────── */}
      <div className={styles.ambientGlow} />
      <div className={styles.scanlines} />
      <div className={styles.noise} />

      {/* ── Moving horizontal scan beam ──────────────────── */}
      <div className={styles.scanBeam} />

      {/* ── Full-screen glitch flash ──────────────────────── */}
      <div className={`${styles.glitchOverlay} ${glitchFull ? styles.glitchOverlayActive : ""}`} />

      {/* ── Skip intro (top-right) ────────────────────────── */}
      <button className={styles.skipBtn} onClick={handleContinue}>
        [ SKIP INTRO ]
      </button>

      {/* ── Decorative HUD — top-left ─────────────────────── */}
      <div className={styles.hudLeft}>
        <div className={styles.hudLine}>SYS&nbsp;&nbsp;ACTIVE</div>
        <div className={styles.hudLine}>NET&nbsp;&nbsp;SECURE</div>
        <div className={styles.hudLine}>ENC&nbsp;&nbsp;AES-256</div>
        <div className={styles.hudLine}>{ts}</div>
      </div>

      {/* ── Decorative HUD — bottom-right ─────────────────── */}
      <div className={styles.hudRight}>
        <div className={styles.hudLine}>3.1390° N</div>
        <div className={styles.hudLine}>101.6869° E</div>
        <div className={styles.hudLine}>KUL · UTC+8</div>
      </div>

      {/* ── Terminal container ────────────────────────────── */}
      <div className={styles.terminalWrapper}>
        {/* Corner bracket decorations */}
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />

        <div className={`${styles.terminal} ${glitchTerm ? styles.terminalGlitch : ""}`}>

          {/* Title bar */}
          <div className={styles.titleBar}>
            <div className={styles.titleDots}>
              <span style={{ background: "#ff5f57" }} />
              <span style={{ background: "#febc2e" }} />
              <span style={{ background: "#28c840" }} />
            </div>
            <span className={styles.titleLabel}>
              secure_shell&nbsp;&nbsp;·&nbsp;&nbsp;azim@mainframe:~
            </span>
            <span className={styles.titleStatus}>
              <span className={styles.statusPulse} />
              LIVE
            </span>
          </div>

          {/* Terminal body */}
          <div className={styles.termBody} ref={termBodyRef}>
            {lines.map((line, i) => (
              <Line
                key={i}
                line={line}
                progress={line.type === "progress" ? progress : undefined}
              />
            ))}

            {/* Currently typing line (with blinking cursor) */}
            {typing && (
              <div className={`${styles.line} ${TYPE_CLASS[typing.type] || ""}`}>
                {typing.text}
                <span className={styles.cursor} />
              </div>
            )}

            {/* Idle cursor when queue is paused or waiting */}
            {!typing && phase !== "exiting" && (
              <div className={`${styles.line} ${styles.lineCmd}`}>
                <span className={styles.cursor} />
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* ── "Press ENTER" hint (appears after ACCESS GRANTED) */}
      {showContinue && phase === "waiting" && (
        <button className={styles.continueHint} onClick={handleContinue}>
          <span className={styles.hintLine} />
          <span className={styles.hintDesktop}>PRESS&nbsp;&nbsp;ENTER&nbsp;&nbsp;TO&nbsp;&nbsp;ACCESS&nbsp;&nbsp;PORTFOLIO</span>
          <span className={styles.hintMobile}>TAP&nbsp;&nbsp;HERE&nbsp;&nbsp;TO&nbsp;&nbsp;ENTER&nbsp;&nbsp;PORTFOLIO</span>
          <span className={styles.hintLine} />
        </button>
      )}
    </div>
  );
}
