
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Typewriter } from "react-simple-typewriter";
import "./Landing.css";
import bgVideo from "../assets/bg-video.mp4";


export default function LandingPage({ onGetStarted, onLogin, onSignup }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // login | signup

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      particles: {
        number: { value: 60 },
        color: { value: ["#8b5cf6", "#22d3ee", "#34d399", "#f472b6"] },
        links: { enable: true, distance: 130, opacity: 0.25, color: "#8b5cf6" },
        move: { enable: true, speed: 1.2 },
      },
    }),
    []
  );

  return (
    <div className="landing">
      {/* 🔹 Background video */}
      {/* <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <video className="bg-video" autoPlay muted loop playsInline>
  <source src={bgVideo} type="video/mp4" />
</video>


      {/* 🔹 Overlay for readability */}
      <div className="bg-overlay" />

      {/* 🔹 Particles */}
      <div className="bg-particles">
        <Particles id="tsp" init={particlesInit} options={particlesOptions} />
      </div>

      {/* 🔹 Foreground content */}
      <nav className="nav">
        <div className="logo">
          <span className="dot" />
          Auralens
        </div>
        <div className="nav-actions">
          <button
            className="btn ghost"
            onClick={() => {
              setAuthMode("login");
              setAuthOpen(true);
            }}
          >
            Log in
          </button>
          <button
            className="btn primary"
            onClick={() => {
              setAuthMode("signup");
              setAuthOpen(true);
            }}
          >
            Sign up
          </button>
        </div>
      </nav>

      <header className="hero">
        <motion.h1
          className="headline"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Feel the music with <span className="brand">Auralens</span>
        </motion.h1>

        <motion.p
          className="sub"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <Typewriter
            words={[
              "AI-powered Mood Detection 🎯",
              "Personalized Recommendations 🎧",
              "Blazing Fast React UI ⚡",
              "Your Daily Mix & Liked Songs 💜",
            ]}
            loop
            cursor
          />
        </motion.p>

        <motion.div
          className="cta-row"
          initial={{ y: 34, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <button className="btn xl primary" onClick={onGetStarted}>
            Get Started
          </button>
        </motion.div>

        <motion.div
          className="hero-badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="badge">React</span>
          <span className="badge">Framer Motion</span>
          <span className="badge">Particles</span>
          <span className="badge">Mongo + Flask</span>
        </motion.div>
      </header>

      <section className="section features">
        <FeatureCard
          icon="🎵"
          title="Smart Recommendations"
          desc="AI analyzes your mood text and serves perfect tracks instantly."
          delay={0.05}
        />
        <FeatureCard
          icon="❤️"
          title="Liked & Recent"
          desc="Keep favorites close and revisit your recent journeys."
          delay={0.1}
        />
        <FeatureCard
          icon="⚡"
          title="Blazing UI"
          desc="Interactive, animated, and ultra-responsive React interface."
          delay={0.15}
        />
        <FeatureCard
          icon="🧠"
          title="Emotion Engine"
          desc="ML-powered emotion → mood mapping for hyper-personalization."
          delay={0.2}
        />
      </section>

      <footer className="footer">
        <div className="foot-left">© {new Date().getFullYear()} Auralens</div>
        <div className="foot-right">
          <a href="#" className="social">Twitter</a>
          <a href="#" className="social">GitHub</a>
          <a href="#" className="social">Contact</a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay = 0 }) {
  return (
    <motion.div
      className="feature-card"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="feature-icon">{icon}</div>
      <div className="feature-title">{title}</div>
      <div className="feature-desc">{desc}</div>
    </motion.div>
  );
}