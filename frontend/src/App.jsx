import { useState, useEffect } from 'react'
import SpinningWheel from './components/SpinningWheel'
import './App.css'

function App() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics')
        if (!response.ok) throw new Error('Failed to fetch topics')
        const data = await response.json()
        setTopics(data.topics)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching topics:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTopics()
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Impromptu Speaking Wheel</h1>
        <p>Click the wheel to get a random speaking topic!</p>
      </header>
      
      <main className="main-content">
        {loading && <div className="loading">Loading topics...</div>}
        {error && <div className="error">Error: {error}</div>}
        {!loading && !error && topics.length > 0 && (
          <SpinningWheel topics={topics} />
        )}
      </main>
    </div>
  )
}

export default App
