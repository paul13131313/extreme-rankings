import { useInView } from '../hooks/useInView'
import type { TopicMeta } from '../types/ranking'

interface Props {
  topic: TopicMeta
  index: number
  onClick: () => void
}

export default function TopicCard({ topic, index, onClick }: Props) {
  const { ref, isInView } = useInView(0.1)

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="relative group cursor-pointer p-5 md:p-6 transition-all duration-300"
      style={{
        background: '#1a1a1a',
        border: '1px solid #222',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${(index % 8) * 60}ms`,
        transitionProperty: 'opacity, transform, border-color',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#FD551D'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#222'
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#FD551D' }}
          >
            {topic.category}
          </span>
          <span
            className="text-[10px]"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#333' }}
          >
            #{String(topic.number).padStart(2, '0')}
          </span>
        </div>

        <div className="text-3xl mb-4">{topic.emoji}</div>

        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 700, color: '#EEEEEE' }}
        >
          {topic.question}
        </p>

        <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className="text-[10px] uppercase tracking-wider"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#FD551D' }}
          >
            View Ranking
          </span>
          <span style={{ color: '#FD551D', fontSize: '12px' }}>→</span>
        </div>
      </div>
    </div>
  )
}
