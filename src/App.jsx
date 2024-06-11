import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainForm from "./Componentes/Grid/GridContainer";
import Cabecalho from "./Componentes/Cabecalho";
import ListarPagina from "./Componentes/ListarPagina";

const App = () => {
  return (
    <Router>
      <Cabecalho />
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="/listar" element={<ListarPagina />} />
      </Routes>
    </Router>
  );
};

export default App;
