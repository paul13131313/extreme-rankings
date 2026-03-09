export default function Footer() {
  return (
    <footer className="py-24 px-8 md:px-16 lg:px-24" style={{ borderTop: '1px solid #1e1e1e' }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p
          className="text-[11px] tracking-[0.1em]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: '#333' }}
        >
          EXTREME RANKINGS — DATA BASED ON PUBLIC STATISTICS
        </p>
        <p
          className="text-[11px]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: '#333' }}
        >
          © 2025 STUDIO PAUL
        </p>
      </div>
    </footer>
  )
}
