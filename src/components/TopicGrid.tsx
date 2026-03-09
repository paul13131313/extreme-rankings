import TopicCard from './TopicCard'
import type { TopicMeta } from '../types/ranking'

interface Props {
  topics: TopicMeta[]
  onSelect: (id: string) => void
}

export default function TopicGrid({ topics, onSelect }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-8 h-[2px]" style={{ background: '#FD551D' }} />
        <p
          className="text-[11px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: '#555' }}
        >
          All Topics ({topics.length})
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px]" style={{ background: '#222' }}>
        {topics.map((topic, i) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            index={i}
            onClick={() => onSelect(topic.id)}
          />
        ))}
      </div>
    </section>
  )
}
