import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { supabase } from '../client'
import { sampleCreators } from '../data/sampleCreators'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true)
      setMessage('')

      const { data, error } = await supabase.from('creators').select('*')

      if (error) {
        console.error('Error fetching creators:', error)
        setMessage(error.message)
        setCreators([])
        setLoading(false)
        return
      }

      if (!data || data.length === 0) {
        const { data: seededCreators, error: seedError } = await supabase
          .from('creators')
          .insert(sampleCreators)
          .select('*')

        if (seedError) {
          console.error('Error seeding creators:', seedError)
          setMessage(`Connected, but could not auto-add starter creators: ${seedError.message}`)
          setCreators(
            sampleCreators.map((creator, index) => ({
              ...creator,
              id: `sample-${index + 1}`,
            })),
          )
        } else {
          setCreators(seededCreators || [])
        }
      } else {
        setCreators(data)
      }

      setLoading(false)
    }

    fetchCreators()
  }, [])

  return (
    <section className="page-section">
      <div className="hero-panel">
        <p className="eyebrow">WEB103 Creator Project</p>
        <h1>Creators worth following</h1>
        <p className="hero-copy">
          Browse, add, edit, and delete your favorite content creators from one simple React + Supabase app.
        </p>
        <Link to="/creators/new" className="primary-button">
          + Add New Creator
        </Link>
      </div>

      {message && <p className="status-message warning">{message}</p>}
      {loading && <p className="status-message">Loading creators...</p>}

      {!loading && creators.length === 0 && (
        <div className="empty-state">
          <h2>No creators yet</h2>
          <p>Add your first creator to start building your Creatorverse.</p>
          <Link to="/creators/new" className="primary-button">
            Add Creator
          </Link>
        </div>
      )}

      {!loading && creators.length > 0 && (
        <div className="creator-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </section>
  )
}
