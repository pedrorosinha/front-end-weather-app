import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainForm, { MainFormProps }  from "./Componentes/Grid/GridContainer";
import Cabecalho from "./Componentes/Cabecalho";
import ListarPagina from "./Componentes/ListarPagina";
import EditarPagina from "./Componentes/EditarPagina";

const API_URL: MainFormProps['API_URL'] = process.env.REACT_APP_API_URL || '';

const App: React.FC = () => {
  return (
    <Router>
      <Cabecalho />
      <Routes>
        <Route path="/" element={<MainForm API_URL={API_URL} />} />
        <Route path="/listar" element={<ListarPagina />} />
        <Route path="/editar/:id" element={<EditarPagina />} />
      </Routes>
    </Router>
  );
};

export default App;