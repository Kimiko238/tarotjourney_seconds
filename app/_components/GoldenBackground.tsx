export default function GoldenBackground() {
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
        className="absolute left-15 top-25   h-24 w-24 opacity-95 drop-shadow-[0_0_18px_rgba(255,230,150,0.95)]"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <filter id="crescent-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.2" result="soft" />
            <feGaussianBlur stdDeviation="5.0" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="soft" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="crescent-cut">
            <rect width="100" height="100" fill="white" />
            <circle cx="66" cy="42" r="30" fill="black" />
          </mask>
        </defs>
        <circle
          cx="48"
          cy="50"
          r="34"
          fill="#fad74d"
          filter="url(#crescent-glow)"
          mask="url(#crescent-cut)"
        />
      </svg>
      <div
        className="absolute right-[10%] top-[10%] h-1 w-1 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-45deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={{ animationDelay: "0s", animationDuration: "2.5s" }}
      />
      <div
        className="absolute right-[30%] top-[30%] h-1 w-1 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-45deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={{ animationDelay: "1.2s", animationDuration: "3s" }}
      />
      <div
        className="absolute right-[20%] top-[50%] h-0.5 w-0.5 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-45deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={{ animationDelay: "2.5s", animationDuration: "2.8s" }}
      />
      <div
        className="absolute right-[50%] top-[20%] h-0.5 w-0.5 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-45deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={{ animationDelay: "4s", animationDuration: "3.2s" }}
      />
      <div
        className="absolute right-[75%] top-[80%] h-0.5 w-0.5 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-45deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={{ animationDelay: "2.5s", animationDuration: "2.8s" }}
      />
      <div
        className="absolute right-[80%] top-[10%] h-0.5 w-0.5 rounded-full bg-white opacity-0 shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,1)] animate-[shootingStar_3s_ease-in_infinite] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[110px] before:-translate-y-1/2 before:origin-left before:rotate-[-45deg] before:bg-[linear-gradient(90deg,white,transparent)] before:content-['']"
        style={{ animationDelay: "2.5s", animationDuration: "2.8s" }}
      />
    </div>
  );
}
