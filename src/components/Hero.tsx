export default function Hero() {
  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-8 py-24">
      <div className="relative z-10 text-center max-w-4xl">
        <p
          className="text-[11px] tracking-[0.4em] uppercase mb-14"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: '#555' }}
        >
          Data Visualization / 20 Questions
        </p>

        <h1 className="mb-14">
          <span
            className="block text-6xl md:text-8xl lg:text-[120px] leading-[0.9] tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, color: '#EEEEEE' }}
          >
            EXTREME
          </span>
          <span
            className="block text-6xl md:text-8xl lg:text-[120px] leading-[0.9] tracking-tight mt-3"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, color: '#FD551D' }}
          >
            RANKINGS
          </span>
        </h1>

        <div className="w-12 h-[2px] mx-auto mb-12" style={{ background: '#FD551D' }} />

        <p
          className="text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400, color: '#888' }}
        >
          この世界で最も○○なランキング
        </p>
        <p
          className="text-xs mt-5"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: '#444' }}
        >
          20 extreme questions, answered with data.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div
          className="w-[1px] h-12 animate-pulse"
          style={{ background: 'linear-gradient(to bottom, #FD551D, transparent)' }}
        />
      </div>
    </section>
  )
}
