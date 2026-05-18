import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'

const emptyForm = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
}

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true)
      setErrorMessage('')

      const { data, error } = await supabase.from('creators').select('*').eq('id', id).maybeSingle()

      if (error) {
        console.error('Error loading creator:', error)
        setErrorMessage(error.message)
      } else if (!data) {
        setErrorMessage('Creator not found.')
      } else {
        setFormData({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || '',
        })
      }

      setLoading(false)
    }

    fetchCreator()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setErrorMessage('')

    const payload = {
      name: formData.name.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      imageURL: formData.imageURL.trim() || null,
    }

    const { data, error } = await supabase.from('creators').update(payload).eq('id', id).select('*').single()

    setSaving(false)

    if (error) {
      console.error('Error updating creator:', error)
      setErrorMessage(error.message)
      return
    }

    navigate(`/creators/${data.id}`)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this creator from Creatorverse?')
    if (!confirmed) return

    setDeleting(true)
    setErrorMessage('')

    const { error } = await supabase.from('creators').delete().eq('id', id)

    setDeleting(false)

    if (error) {
      console.error('Error deleting creator:', error)
      setErrorMessage(error.message)
      return
    }

    navigate('/')
  }

  if (loading) {
    return (
      <section className="page-section narrow-page">
        <p className="status-message">Loading creator...</p>
      </section>
    )
  }

  return (
    <section className="page-section narrow-page">
      <Link to={`/creators/${id}`} className="back-link">
        ← Back to creator
      </Link>

      <div className="form-card">
        <p className="eyebrow">Edit Creator</p>
        <h1>Update Creator</h1>
        <p className="form-intro">Change this creator&apos;s name, URL, description, or image.</p>

        {errorMessage && <p className="status-message error">{errorMessage}</p>}

        {!errorMessage.includes('not found') && (
          <form onSubmit={handleSubmit} className="creator-form">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />

            <label htmlFor="url">Channel URL</label>
            <input id="url" name="url" type="url" value={formData.url} onChange={handleChange} required />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />

            <label htmlFor="imageURL">Image URL <span>(optional)</span></label>
            <input id="imageURL" name="imageURL" type="url" value={formData.imageURL} onChange={handleChange} />

            <div className="form-actions">
              <button type="submit" className="primary-button" disabled={saving || deleting}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" className="danger-button" onClick={handleDelete} disabled={saving || deleting}>
                {deleting ? 'Deleting...' : 'Delete Creator'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
