import { useEffect, useState } from 'react'
import RankingBar from './RankingBar'
import type { RankingItem } from '../types/ranking'

interface Props {
  items: RankingItem[]
}

export default function RankingList({ items }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const maxValue = Math.max(
    ...items.map((item) => item.numericValue ?? 0)
  )

  return (
    <div className="divide-y" style={{ borderColor: '#1e1e1e' }}>
      {items.map((item) => (
        <RankingBar
          key={item.rank}
          item={item}
          maxValue={maxValue}
          isVisible={isVisible}
          delay={item.rank * 80}
        />
      ))}
    </div>
  )
}
