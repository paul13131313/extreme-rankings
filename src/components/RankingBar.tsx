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
      className="py-6 md:py-8 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
        transitionDelay: `${delay}ms`,
        borderBottom: '1px solid #1e1e1e',
      }}
    >
      <div className="flex items-start gap-6 md:gap-10">
        <div
          className="shrink-0 w-12 text-right"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: isTopThree ? '1.5rem' : '1.125rem',
            color: isTopThree ? '#FD551D' : '#444',
          }}
        >
          {String(item.rank).padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-4 md:gap-5 mb-3 flex-wrap">
            <span className="text-lg">{item.flag}</span>
            <span
              className={isTopThree ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: isTopThree ? 700 : 400,
                color: '#EEEEEE',
              }}
            >
              {item.name}
            </span>
            <span
              className="text-base md:text-lg shrink-0"
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
            <div className="h-[5px] overflow-hidden mb-4" style={{ background: '#1e1e1e' }}>
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
            className="text-sm md:text-base leading-relaxed mt-1"
            style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#555' }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}
