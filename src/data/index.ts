import type { TopicMeta, RankingTopic } from '../types/ranking'

const modules = import.meta.glob('./rankings/*.json', { eager: true })

const topicColors: Record<string, string> = {
  happiness: '#FFD700',
  danger: '#FF3333',
  salary: '#00E676',
  poverty: '#8D6E63',
  pollution: '#78909C',
  longevity: '#26C6DA',
  sleep: '#7C4DFF',
  safety: '#42A5F5',
  coffee: '#D4A574',
  language: '#FF7043',
  space: '#5C6BC0',
  unhappiness: '#546E7A',
  building: '#BDBDBD',
  alcohol: '#FF8A65',
  education: '#66BB6A',
  loneliness: '#AB47BC',
  traffic: '#FFA726',
  calorie: '#EF5350',
  labor: '#EC407A',
  extinction: '#26A69A',
}

export function getAllTopics(): RankingTopic[] {
  const topics: RankingTopic[] = []
  for (const path in modules) {
    const mod = modules[path] as { default: RankingTopic }
    topics.push(mod.default)
  }
  topics.sort((a, b) => a.number - b.number)
  return topics
}

export function getTopicMetas(): TopicMeta[] {
  return getAllTopics().map((t) => ({
    id: t.id,
    number: t.number,
    question: t.question,
    shortTitle: t.shortTitle,
    category: t.category,
    emoji: t.emoji,
    accentColor: topicColors[t.id] || '#888888',
  }))
}

export function getTopicById(id: string): RankingTopic | undefined {
  return getAllTopics().find((t) => t.id === id)
}

export function getAccentColor(id: string): string {
  return topicColors[id] || '#888888'
}
