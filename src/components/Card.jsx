import { Link } from 'react-router-dom'

export default function Card({ creator }) {
  const creatorUrl = creator.url?.startsWith('http') ? creator.url : `https://${creator.url}`
  const imageUrl = creator.imageURL?.trim()

  return (
    <article className="creator-card">
      <Link to={`/creators/${creator.id}`} className="card-image-link" aria-label={`View ${creator.name}`}>
        {imageUrl ? (
          <img src={imageUrl} alt={creator.name} className="creator-image" />
        ) : (
          <div className="creator-image placeholder-image">{creator.name?.slice(0, 1) || '?'}</div>
        )}
      </Link>

      <div className="card-body">
        <div className="card-heading-row">
          <h2>
            <Link to={`/creators/${creator.id}`}>{creator.name}</Link>
          </h2>
          <Link to={`/creators/${creator.id}/edit`} className="icon-link" aria-label={`Edit ${creator.name}`}>
            Edit
          </Link>
        </div>

        <p>{creator.description}</p>

        <div className="card-actions">
          <a href={creatorUrl} target="_blank" rel="noreferrer" className="external-link">
            Visit Channel ↗
          </a>
          <Link to={`/creators/${creator.id}`} className="details-link">
            Details
          </Link>
        </div>
      </div>
    </article>
  )
}
