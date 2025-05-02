import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ pages }) => {
  const sortedPages = [...pages].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Bienvenido a Hard P Shop</h1>
        <p>Aquí puedes publicar tus procesadores.</p>
        <Link to="/create" className="create-page-button">
          Publicar un producto
        </Link>
      </div>

      <div className="recent-pages">
        <h2>Publicaciones recientes</h2>
        {sortedPages.length > 0 ? (
          <div className="pages-grid">
            {sortedPages.map(page => (
              <div key={page.id} className="page-card">
                <h3>
                  <Link to={`/page/${page.id}`}>{page.title}</Link>
                </h3>
                <div className="page-date">
                  Creado: {formatDate(page.createdAt)}
                </div>
                <p className="page-excerpt">
                  {page.content.length > 150 
                    ? `${page.content.substring(0, 150)}...` 
                    : page.content}
                </p>
                <Link to={`/page/${page.id}`} className="read-more">
                  Leer más
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-pages">No hay productos publicados. ¡Haz tu primera publicación!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage; 