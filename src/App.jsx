import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainForm from "./Componentes/Grid/GridContainer";
import Cabecalho from "./Componentes/Cabecalho";
import ListarPagina from "./Componentes/ListarPagina";
import UpdateForm from "./Componentes/PaginaEditar";

const App = () => {
  return (
    <Router>
      <Cabecalho />
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="/listar" element={<ListarPagina />} />
        <Route path="/editar" element={<UpdateForm />} />
      </Routes>
    </Router>
  );
};

export default App;
