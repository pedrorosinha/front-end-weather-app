import React, { useState } from "react";
import GlobalStyles from "./Componentes/EstiloGlobal";
import Cabecalho from "./Componentes/Cabecalho";
import Breadcrumb from "./Componentes/BreadCrumb";
import InputBusca from "./Componentes/InputBusca";
import InputTemperatura from "./Componentes/InputTemperatura";
import InputTempo from "./Componentes/InputTempo";
import InputTags from "./Componentes/InputTags";
import InputData from "./Componentes/InputData";
import InputDadosMetereologicos from "./Componentes/InputDadosMetereologicos";
import Botoes from "./Componentes/Botoes";
import CenarioSucesso from "./Componentes/CenarioSucesso";
import Titulo from "./Componentes/Titulo";
import ModalErro from './Componentes/CenarioErro';
import axios from "axios";

const App = () => {
  const API_URL = process.env.REACT_APP_API_URL

  const [temperatura, setTemperatura] = useState("");
  const [showModalSucesso, setModalSucesso] = useState(false);
  const [showModalErro, setModalErro] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClima, setSelectedClima] = useState(null);
  const [selectedBusca, setSelectedBusca] = useState(null);
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState({
    precipitacao: null,
    umidade: null,
    velocidadeVento: null
  });

  const handleTemperaturaChange = (value) => {
    setTemperatura(value);
  };

  const handleTurnoChange = (turno) => {
    setSelectedTurno(turno);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClimaChange = (clima) => {
    setSelectedClima(clima);
  };

  const handleBuscaChange = (busca) => {
    setSelectedBusca(busca);
  };

  const handleDadosMeteorologicosChange = (data) => {
    setDadosMeteorologicos({
      ...dadosMeteorologicos,
      ...data
    });
  };

  const validateFields = () => {
    return (
      temperatura !== "" &&
      selectedTurno !== null &&
      selectedDate !== null &&
      selectedClima !== null &&
      selectedBusca !== null &&
      dadosMeteorologicos.precipitacao !== null &&
      dadosMeteorologicos.umidade !== null &&
      dadosMeteorologicos.velocidadeVento !== null
    );
  };

  const handleSalvar = async () => {
    if (validateFields()) {
      try {
        const dados = {
          cidade: selectedBusca,
          turno: selectedTurno,
          clima: selectedClima,
          temperaturaMinima: temperatura.temperaturaMinima,
          temperaturaMaxima: temperatura.temperaturaMaxima,
          precipitacao: dadosMeteorologicos.precipitacao,
          umidade: dadosMeteorologicos.umidade,
          velocidadeVento: dadosMeteorologicos.velocidadeVento,
          data: selectedDate,
        };
  
        const response = await axios.post(`${API_URL}/tempo/previsao/`, dados, {
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.status === 201) {
          setModalSucesso(true);
        }
      } catch (error) {
        setModalErro(true);
        console.log("Erro!", error);
      }
    } else {
      setModalErro(true);
    }
  };  

  return (
    <>
      <GlobalStyles />
      <Cabecalho />
      <Breadcrumb />
      <Titulo />
      <InputBusca onInputChange={handleBuscaChange} />
      <InputTemperatura onInputChange={handleTemperaturaChange} />
      <InputTempo onInputChange={handleClimaChange} />
      <InputTags onInputChange={handleTurnoChange} />
      <InputData onInputChange={handleDateChange} />
      <InputDadosMetereologicos onInputChange={handleDadosMeteorologicosChange} />
      <Botoes onSave={handleSalvar} />
      <CenarioSucesso
        isOpen={showModalSucesso}
        onClose={() => setModalSucesso(false)}
        validateFields={validateFields}
      />
      <ModalErro isOpen={showModalErro} onClose={() => setModalErro(false)} />
    </>
  );
};

export default App;