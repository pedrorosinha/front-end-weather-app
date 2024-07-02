import React from 'react';
import { useLocation } from 'react-router-dom';
import EditarFormulario from '../FormularioEditar';

const EditarPagina: React.FC = () => {
  const location = useLocation();
  const record = location.state?.record;

  if (!record) {
    return <div>Registro não encontrado</div>;
  }

  return <EditarFormulario record={record} />;
};

export default EditarPagina;
