import { useState, useCallback } from 'react'
import Hero from './components/Hero'
import TopicGrid from './components/TopicGrid'
import RankingModal from './components/RankingModal'
import Footer from './components/Footer'
import { getTopicMetas, getTopicById } from './data'

function App() {
  const topics = getTopicMetas()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleClose = useCallback(() => setSelectedId(null), [])

  const selectedTopic = selectedId ? getTopicById(selectedId) : null

  return (
    <div className="min-h-screen">
      <Hero />
      <TopicGrid topics={topics} onSelect={setSelectedId} />
      <Footer />

      {selectedTopic && (
        <RankingModal
          topic={selectedTopic}
          onClose={handleClose}
        />
      )}
    </div>
  )
}

export default App
