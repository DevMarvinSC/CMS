import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './PageForm.css';

const PageForm = ({ onAddPage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;


    if (!file.type.match('image.*')) {
      alert('Por favor, selecciona un archivo de imagen');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          img,
          (img.width - size) / 2,
          (img.height - size) / 2,
          size,
          size,
          0,
          0,
          size,
          size
        );
        
        const croppedImageUrl = canvas.toDataURL('image/jpeg');
        setImagePreview(croppedImageUrl);
        setImage(croppedImageUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const newPage = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      image,
      createdAt: new Date().toISOString()

    };

    onAddPage(newPage);
    navigate(`/page/${newPage.id}`);
  };

  return (
    <div className="page-form-container">
      <h2>Publicar en Hard P Shop</h2>
      <form onSubmit={handleSubmit} className="page-form">
        <div className="form-group">
          <label htmlFor="title">Producto:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingresa el nombre del procesador"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Descripción:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ingresa los detalles del producto (Cantidad, generación, frecuencia, etc)"
            rows="10"
            required
          />
        </div>
        {/* Entrada de la imágen */} 
        <div className="form-group">
          <label htmlFor="image">Imagen (se recortará cuadrada):</label>
          <input
            type="file"
            id="image"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && ( 
            <div className="image-preview-container">
              <img 
                src={imagePreview} 
                alt="Vista previa" 
                className="image-preview"
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancelar
          </button>
          <button type="submit" className="submit-button">
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageForm; 