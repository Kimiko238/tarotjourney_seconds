"use client";

import { useEffect, useState, type CSSProperties } from "react";

const SYNODIC_MONTH_DAYS = 29.53058867;
const MOON_EPOCH_MS = Date.UTC(2000, 0, 6, 18, 14, 0);
const MS_PER_DAY = 86_400_000;
const MS_PER_HOUR = 3_600_000;

const getMoonPhase = (timestampMs: number) => {
  const daysSinceEpoch = (timestampMs - MOON_EPOCH_MS) / MS_PER_DAY;
  const phaseDays =
    ((daysSinceEpoch % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) %
    SYNODIC_MONTH_DAYS;
  return phaseDays / SYNODIC_MONTH_DAYS;
};

export default function GoldenBackground() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const jstNowMs = Date.now() + 9 * MS_PER_HOUR;
    setPhase(getMoonPhase(jstNowMs));
  }, []);

  const phaseAngle = 2 * Math.PI * phase;
  const radius = 34;
  const distance = radius * (1 - Math.cos(phaseAngle));
  const direction = phase < 0.5 ? -1 : 1;
  const shadowOffsetX = direction * distance;

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="twinkle-fast absolute left-[16%] top-[4%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      <div className="twinkle-slow absolute left-[75%] top-[3%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      <div className="twinkle-fast absolute left-[20%] top-[40%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      <div className="twinkle-fast absolute left-[40%] top-[32%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      <div className="twinkle-slow absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      <div className="twinkle-mid absolute left-[88%] top-[24%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      <div className="twinkle-mid absolute left-[73%] top-[20%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      <div className="twinkle-fast absolute left-[15%] top-[68%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      <div className="twinkle-mid absolute left-[28%] top-[32%] h-1 w-1 rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
      <div className="twinkle-slow absolute left-[58%] top-[22%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
      <div className="twinkle-slow absolute left-[72%] top-[40%] h-1 w-1 rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
      <div className="twinkle-mid absolute left-[20%] top-[23%] h-1 w-1 rounded-full bg-white/85 shadow-[0_0_6px_rgba(255,255,255,0.75)]" />
      <svg
        className="absolute left-[75%] top-[2%] h-24 w-24 opacity-95 drop-shadow-[0_0_18px_rgba(255,230,150,0.95)] lg:left-[70%] lg:top-[5%]"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="crescent-glow"
            x="-60%"
            y="-60%"
            width="220%"
            height="220%"
          >
            <feGaussianBlur stdDeviation="2.2" result="soft" />
            <feGaussianBlur stdDeviation="5.0" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="soft" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="moon-soften" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.0" />
          </filter>
          <mask id="moon-phase-mask">
            <rect width="100" height="100" fill="white" />
            <g filter="url(#moon-soften)">
              <circle cx={48 + shadowOffsetX} cy="50" r={radius} fill="black" />
            </g>
          </mask>
        </defs>
        <circle
          cx="48"
          cy="50"
          r={radius}
          fill="#fad74d"
          filter="url(#crescent-glow)"
          mask="url(#moon-phase-mask)"
        />
      </svg>
      <div
        className="absolute right-[5%] top-[30%] h-1 w-1 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-29deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={
          {
            animationDelay: "0s",
            animationDuration: "2.5s",
            "--shoot-x": "-340px",
            "--shoot-y": "190px",
          } as React.CSSProperties
        }
      />
      <div
        className="absolute right-[30%] top-[30%] h-1 w-1 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-30deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={
          {
            animationDelay: "1.2s",
            animationDuration: "3s",
            "--shoot-x": "-300px",
            "--shoot-y": "173px",
          } as CSSProperties
        }
      />
      <div
        className="absolute right-[10%] top-[3%] h-0.5 w-0.5 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-26deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={
          {
            animationDelay: "2.5s",
            animationDuration: "2.8s",
            "--shoot-x": "-260px",
            "--shoot-y": "125px",
          } as CSSProperties
        }
      />
      <div
        className="absolute right-[50%] top-[3%] h-0.5 w-0.5 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-32deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={
          {
            animationDelay: "2.5s",
            animationDuration: "3.2s",
            "--shoot-x": "-320px",
            "--shoot-y": "200px",
          } as CSSProperties
        }
      />
      <div
        className="absolute right-[50%] top-[20%] h-0.5 w-0.5 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-33deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={
          {
            animationDelay: "4s",
            animationDuration: "3.2s",
            "--shoot-x": "-300px",
            "--shoot-y": "195px",
          } as CSSProperties
        }
      />
      <div
        className="absolute right-[75%] top-[15%] h-0.5 w-0.5 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-34deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={
          {
            animationDelay: "2.5s",
            animationDuration: "2.8s",
            "--shoot-x": "-300px",
            "--shoot-y": "205px",
          } as React.CSSProperties
        }
      />
      <div
        className="absolute right-[80%] top-[10%] h-0.5 w-0.5 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-31deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={
          {
            animationDelay: "2.5s",
            animationDuration: "2.8s",
            "--shoot-x": "-310px",
            "--shoot-y": "186px",
          } as CSSProperties
        }
      />
    </div>
  );
}
