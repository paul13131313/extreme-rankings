import TopicCard from './TopicCard'
import type { TopicMeta } from '../types/ranking'

interface Props {
  topics: TopicMeta[]
  onSelect: (id: string) => void
}

export default function TopicGrid({ topics, onSelect }: Props) {
  return (
    <section className="w-full px-8 md:px-16 lg:px-24 py-20">
      <div className="flex items-center gap-5 mb-14">
        <div className="w-8 h-[2px]" style={{ background: '#FD551D' }} />
        <p
          className="text-[11px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: '#555' }}
        >
          All Topics ({topics.length})
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
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
