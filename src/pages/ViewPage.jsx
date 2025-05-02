import React from 'react';
import PageContent from '../components/PageContent';
import { useParams } from 'react-router-dom';

const ViewPage = ({ pages, onDeletePage }) => {
  const { id } = useParams();
  const page = pages.find(p => p.id === id);

  if (!page){
    return <div>Página no econtrada</div>
  }
  return (
    <div className="view-page">
      <PageContent pages={pages}
      onDeletePage={onDeletePage}
      />
    </div>
  );
};

export default ViewPage; 