import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

const initialForm = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
}

export default function AddCreator() {
  const [formData, setFormData] = useState(initialForm)
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

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

    const { data, error } = await supabase.from('creators').insert([payload]).select('*').single()

    setSaving(false)

    if (error) {
      console.error('Error adding creator:', error)
      setErrorMessage(error.message)
      return
    }

    navigate(`/creators/${data.id}`)
  }

  return (
    <section className="page-section narrow-page">
      <Link to="/" className="back-link">
        ← Back to all creators
      </Link>

      <div className="form-card">
        <p className="eyebrow">New Creator</p>
        <h1>Add a Creator</h1>
        <p className="form-intro">Enter the creator&apos;s name, channel URL, description, and an optional image URL.</p>

        {errorMessage && <p className="status-message error">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="creator-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Creator name"
            required
          />

          <label htmlFor="url">Channel URL</label>
          <input
            id="url"
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://youtube.com/@creator"
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What kind of content do they make?"
            rows="5"
            required
          />

          <label htmlFor="imageURL">Image URL <span>(optional)</span></label>
          <input
            id="imageURL"
            name="imageURL"
            type="url"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />

          <button type="submit" className="primary-button" disabled={saving}>
            {saving ? 'Adding...' : 'Add Creator'}
          </button>
        </form>
      </div>
    </section>
  )
}
