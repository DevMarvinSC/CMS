import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import PageContent from './components/PageContent';
import ViewPage from './pages/ViewPage';
import initialPages from './data/pages.json';
import './App.css';

function App() {
  const [pages, setPages] = useState(() => { 
    const savedPages = localStorage.getItem('cms-pages');
    return savedPages ? JSON.parse(savedPages) : initialPages;
  });
  
  useEffect(() => {
    localStorage.setItem('cms-pages', JSON.stringify(pages));
  }, [pages]);

  
  const handleAddPage = (newPage) => {
    if (!newPage.image) { 
      alert('Debes seleccionar una imagen para el producto');
      return;
    }
    setPages([...pages, newPage]);
  };

  const handleDeletePage = (pageId) => {
    if (window.confirm('¿Estás seguro de querer eliminar esta publicación?')) {
      setPages(pages.filter(page => page.id !== pageId));
 
      alert('Publicación eliminada correctamente');
    }
  };


  return (
    <Router>
      <div className="app">
        <Layout pages={pages}>
          <Routes>
            <Route path="/" element={<HomePage pages={pages} />} />
            <Route 
              path="/create" 
              element={<CreatePage onAddPage={handleAddPage} />} 
            />
            {/* Modificación para agregar la eliminación de publicación */}
            <Route 
              path="/page/:id" 
              element={
                <ViewPage 
                  pages={pages} 
                  onDeletePage={handleDeletePage}
                />
              } 
            />
            <Route 
              path="/content/:id" 
              element={
                <PageContent 
                  pages={pages} 
                  onDeletePage={handleDeletePage} 
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;