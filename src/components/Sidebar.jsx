import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

{/* Modificación de Sidebar para que pueda ocultarse*/}
const Sidebar = ({ pages }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? '☰' : '×'}
        </button>
        {!isCollapsed && (
          <>
            <h2>Productos</h2>
            <ul>
              {pages.map(page => (
                <li key={page.id}>
                  <Link to={`/page/${page.id}`}>{page.title}</Link>
                </li>
              ))}
            </ul>
            <div className="sidebar-footer">
              <Link to="/create" className="create-button">Agregar Producto</Link>
            </div>
          </>
        )}
      </div>
      {isCollapsed && (
        <button className="floating-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
      )}
    </>
  );
};

export default Sidebar;