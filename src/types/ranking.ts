export interface RankingItem {
  rank: number
  name: string
  value: string
  numericValue: number | null
  description: string
  country: string
  flag: string
}

export interface RankingTopic {
  id: string
  number: number
  question: string
  shortTitle: string
  category: string
  emoji: string
  unit: string
  source: string
  lastUpdated: string
  items: RankingItem[]
}

export interface TopicMeta {
  id: string
  number: number
  question: string
  shortTitle: string
  category: string
  emoji: string
  accentColor: string
}
