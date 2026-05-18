import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true)
      setErrorMessage('')

      const { data, error } = await supabase.from('creators').select('*').eq('id', id).maybeSingle()

      if (error) {
        console.error('Error fetching creator:', error)
        setErrorMessage(error.message)
      } else if (!data) {
        setErrorMessage('Creator not found.')
      } else {
        setCreator(data)
      }

      setLoading(false)
    }

    fetchCreator()
  }, [id])

  if (loading) {
    return (
      <section className="page-section narrow-page">
        <p className="status-message">Loading creator...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className="page-section narrow-page">
        <Link to="/" className="back-link">
          ← Back to all creators
        </Link>
        <p className="status-message error">{errorMessage}</p>
      </section>
    )
  }

  const creatorUrl = creator.url?.startsWith('http') ? creator.url : `https://${creator.url}`

  return (
    <section className="page-section narrow-page">
      <Link to="/" className="back-link">
        ← Back to all creators
      </Link>

      <article className="creator-detail-card">
        {creator.imageURL ? (
          <img src={creator.imageURL} alt={creator.name} className="detail-image" />
        ) : (
          <div className="detail-image placeholder-image">{creator.name?.slice(0, 1) || '?'}</div>
        )}

        <div className="detail-content">
          <p className="eyebrow">Creator Details</p>
          <h1>{creator.name}</h1>
          <p>{creator.description}</p>

          <div className="detail-actions">
            <a href={creatorUrl} target="_blank" rel="noreferrer" className="primary-button">
              Visit Channel ↗
            </a>
            <Link to={`/creators/${creator.id}/edit`} className="secondary-button">
              Edit Creator
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}
