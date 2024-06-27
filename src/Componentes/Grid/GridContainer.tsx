import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import axios from 'axios';
import GlobalStyles from '../EstiloGlobal';
import Breadcrumb from '../BreadCrumb';
import InputBusca from '../InputBusca';
import InputTemperatura from '../InputTemperatura';
import InputTempo from '../InputTempo';
import InputTags from '../InputTags';
import InputData from '../InputData';
import InputDadosMetereologicos from '../InputDadosMetereologicos';
import Botoes from '../Botoes';
import CenarioSucesso from '../CenarioSucesso';
import ModalErro from '../CenarioErro';
import Titulo from '../Titulo';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const CustomCol = styled(Col)`
  @media (max-width: 1140px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export interface MainFormProps {
  API_URL: string;
}

const MainForm: React.FC<MainFormProps> = ({ API_URL }) => {
  const [temperatura, setTemperatura] = useState<{ min: string | null; max: string | null }>({ min: null, max: null });
  const [showModalSucesso, setModalSucesso] = useState(false);
  const [showModalErro, setModalErro] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedClima, setSelectedClima] = useState<string | null>(null);
  const [selectedBusca, setSelectedBusca] = useState<string | null>(null);
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState<{ precipitacao: string | null; umidade: string | null; velocidadeVento: string | null }>({
    precipitacao: null,
    umidade: null,
    velocidadeVento: null,
  });

  const handleTemperaturaChange = (value: { min: string | null; max: string | null }) => {
    setTemperatura(value);
  };

  const handleTurnoChange = (turno: string) => {
    setSelectedTurno(turno);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleClimaChange = (clima: string) => {
    setSelectedClima(clima);
  };

  const handleBuscaChange = (busca: string) => {
    setSelectedBusca(busca);
  };

  const handleDadosMeteorologicosChange = (data: { precipitacao: string | null; umidade: string | null; velocidadeVento: string | null }) => {
    setDadosMeteorologicos((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const validateFields = (): boolean => {
    return (
      temperatura.min !== null &&
      temperatura.max !== null &&
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
          temperaturaMinima: temperatura.min,
          temperaturaMaxima: temperatura.max,
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
        console.log('Erro!', error);
      }
    } else {
      setModalErro(true);
    }
  };

  return (
    <PageContainer>
      <GlobalStyles />
      <Breadcrumb />
      <Titulo />
      <Row
        gutter={[16, 16]}
        style={{ marginTop: '32px', rowGap: '16px', maxWidth: '95%', marginLeft: '121px', marginRight: 'auto', justifyContent: 'center' }}
      >
        <CustomCol xs={24} md={12} lg={12}>
          <InputBusca onInputChange={handleBuscaChange} style={{ marginTop: '40px', textAlign: 'center' }} />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputData onInputChange={handleDateChange} />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputTemperatura onInputChange={handleTemperaturaChange} style={{ marginTop: '79px', textAlign: 'center' }} />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputTags onInputChange={handleTurnoChange} />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputTempo onInputChange={handleClimaChange} style={{ marginTop: '86px', textAlign: 'center' }} />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputDadosMetereologicos onInputChange={handleDadosMeteorologicosChange} />
        </CustomCol>
        <Col span={20} style={{ margin: '0 auto', textAlign: 'center' }}>
          <Botoes onSave={handleSalvar} onCancel={() => console.log('Cancelar')} />
        </Col>
      </Row>
      <CenarioSucesso isOpen={showModalSucesso} onClose={() => setModalSucesso(false)} validateFields={validateFields} />
      <ModalErro isOpen={showModalErro} onClose={() => setModalErro(false)} />
    </PageContainer>
  );
};

export default MainForm;
