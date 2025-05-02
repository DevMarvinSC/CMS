import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PageContent.css';

const PageContent = ({ pages, onDeletePage }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const page = pages.find(p => p.id === id);

  if (!page) {
    return (
      <div className="page-not-found">
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      onDeletePage(page.id);
      navigate('/');
    }
  };

  return (
    <div className="page-content">
      <h1>{page.title}</h1>
      <div className="page-meta">
        <span>Creado: {formatDate(page.createdAt)}</span>
      </div>
      
      <div className="content-with-image">
        {page.image && (
          <div className="image-container">
            <img src={page.image} alt={page.title} className="content-image" />
          </div>
        )}
        <div className="text-content">
          {page.content.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>
      </div>
  
      <div className="actions-container">
        <button onClick={handleDelete} className="delete-button">
          Eliminar Publicación
        </button>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    </div>
  );
};

export default PageContent;