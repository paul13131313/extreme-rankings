import type { RankingItem } from '../types/ranking'

interface Props {
  item: RankingItem
  maxValue: number
  isVisible: boolean
  delay: number
}

export default function RankingBar({ item, maxValue, isVisible, delay }: Props) {
  const percentage = maxValue > 0 && item.numericValue != null
    ? (item.numericValue / maxValue) * 100
    : 0
  const isTopThree = item.rank <= 3

  return (
    <div
      className="py-8 md:py-10 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
        transitionDelay: `${delay}ms`,
        borderBottom: '1px solid #1e1e1e',
      }}
    >
      <div className="flex items-start gap-8 md:gap-12">
        <div
          className="shrink-0 w-14 text-right"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: isTopThree ? '1.75rem' : '1.25rem',
            color: isTopThree ? '#FD551D' : '#444',
          }}
        >
          {String(item.rank).padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-5 md:gap-6 mb-4 flex-wrap">
            <span className="text-xl">{item.flag}</span>
            <span
              className={isTopThree ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: isTopThree ? 700 : 400,
                color: '#EEEEEE',
              }}
            >
              {item.name}
            </span>
            <span
              className="text-lg md:text-xl shrink-0"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                color: '#FD551D',
              }}
            >
              {item.value}
            </span>
          </div>

          {percentage > 0 && (
            <div className="h-[6px] overflow-hidden mb-5" style={{ background: '#1e1e1e' }}>
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{
                  width: isVisible ? `${percentage}%` : '0%',
                  background: isTopThree ? '#FD551D' : '#333',
                  transitionDelay: `${delay + 200}ms`,
                }}
              />
            </div>
          )}

          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#555' }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}
