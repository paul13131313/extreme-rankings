import { useEffect } from 'react'
import RankingList from './RankingList'
import type { RankingTopic } from '../types/ranking'

interface Props {
  topic: RankingTopic
  onClose: () => void
}

export default function RankingModal({ topic, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: 'rgba(20, 19, 20, 0.9)' }}
        onClick={onClose}
      />

      <div
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl lg:max-w-6xl overflow-y-auto"
        style={{
          background: '#141314',
          border: '1px solid #222',
        }}
      >
        <div
          className="sticky top-0 z-10 p-8 md:p-12 pb-6 md:pb-8 flex justify-between items-start"
          style={{ background: 'linear-gradient(to bottom, #141314 85%, transparent)' }}
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="text-3xl">{topic.emoji}</span>
              <span
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: '#FD551D' }}
              >
                {topic.category}
              </span>
            </div>
            <h2
              className="text-2xl md:text-4xl leading-snug"
              style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 700, color: '#EEEEEE' }}
            >
              {topic.question}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 w-10 h-10 flex items-center justify-center transition-colors cursor-pointer"
            style={{
              border: '1px solid #333',
              color: '#666',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FD551D'
              e.currentTarget.style.color = '#FD551D'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#333'
              e.currentTarget.style.color = '#666'
            }}
          >
            ✕
          </button>
        </div>

        <div className="px-8 md:px-12">
          <div
            className="flex items-center gap-4 mb-10 text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#444' }}
          >
            <span>UNIT: {topic.unit}</span>
            <span style={{ color: '#222' }}>|</span>
            <span>UPDATED: {topic.lastUpdated}</span>
          </div>

          <RankingList items={topic.items} />
        </div>

        <div className="px-8 md:px-12 py-10 mt-8" style={{ borderTop: '1px solid #1e1e1e' }}>
          <p
            className="text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#333' }}
          >
            SOURCE: {topic.source}
          </p>
        </div>
      </div>
    </div>
  )
}
