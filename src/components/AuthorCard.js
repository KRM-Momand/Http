import React from 'react'

function AuthorCard({id, book, name, website , info}) {
  return (
        <div className="card m-3" style={{width: '100%', maxWidth: '300px', minHeight: '200px', backdropFilter: 'blur(8px)',
         backgroundColor: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)'}}>
        <div className="card-body">
            <h5 className="card-title">{book}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{name}</h6>
            <p className="card-text">{info}</p>
            <a href={website} target='_blank' rel="noopener noreferrer" className="card-link"> {website} </a>
        </div>
        </div>
  )
}

export default AuthorCard;
