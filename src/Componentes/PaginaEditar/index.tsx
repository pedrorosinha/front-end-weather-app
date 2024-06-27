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

interface Props {
  record: {
    id: number;
    temperaturaMinima: number;
    temperaturaMaxima: number;
    turno: 'MANHA' | 'TARDE' | 'NOITE';
    data: string;
    clima: string;
    cidade: string;
    precipitacao: number;
    umidade: number;
    velocidadeVento: number;
  };
}

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

const EditarFormulario: React.FC<Props> = ({ record }) => {
  const API_URL = process.env.REACT_APP_API_URL || '';

  const [temperatura, setTemperatura] = useState<{ min: number; max: number }>({
    min: record.temperaturaMinima,
    max: record.temperaturaMaxima,
  });
  const [showModalSucesso, setModalSucesso] = useState<boolean>(false);
  const [showModalErro, setModalErro] = useState<boolean>(false);
  const [selectedTurno, setSelectedTurno] = useState<'MANHA' | 'TARDE' | 'NOITE'>(record.turno);
  const [selectedDate, setSelectedDate] = useState<string>(record.data);
  const [selectedClima, setSelectedClima] = useState<string>(record.clima);
  const [selectedBusca, setSelectedBusca] = useState<string>(record.cidade);
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState<{
    precipitacao: number;
    umidade: number;
    velocidadeVento: number;
  }>({
    precipitacao: record.precipitacao,
    umidade: record.umidade,
    velocidadeVento: record.velocidadeVento,
  });

  const handleTemperaturaChange = (value: { min: number; max: number }) => {
    setTemperatura(value);
  };

  const handleTurnoChange = (turno: 'MANHA' | 'TARDE' | 'NOITE') => {
    setSelectedTurno(turno);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleClimaChange = (clima: string) => {
    setSelectedClima(clima);
  };

  const handleBuscaChange = (busca: string) => {
    setSelectedBusca(busca);
  };

  const handleDadosMeteorologicosChange = (data: { precipitacao?: number; umidade?: number; velocidadeVento?: number }) => {
    setDadosMeteorologicos({
      ...dadosMeteorologicos,
      ...data,
    });
  };

  const validateFields = () => {
    return (
      temperatura.min !== undefined &&
      temperatura.max !== undefined &&
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

        const response = await axios.put(`${API_URL}/tempo/previsao/${record.id}`, dados, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
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
      <Row
        gutter={[16, 16]}
        style={{
          marginTop: '32px',
          rowGap: '16px',
          maxWidth: '95%',
          marginLeft: '121px',
          marginRight: 'auto',
          justifyContent: 'center',
        }}
      >
        <CustomCol xs={24} md={12} lg={12}>
          <InputBusca
            onInputChange={handleBuscaChange}
            value={selectedBusca}
            style={{ marginTop: '40px', textAlign: 'center' }}
          />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputData
            onInputChange={handleDateChange}
            value={selectedDate}
          />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputTemperatura
            onInputChange={handleTemperaturaChange}
            value={temperatura}
            style={{ marginTop: '79px', textAlign: 'center' }}
          />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputTags onInputChange={handleTurnoChange} value={selectedTurno} />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputTempo
            onInputChange={handleClimaChange}
            value={selectedClima}
            style={{ marginTop: '86px', textAlign: 'center' }}
          />
        </CustomCol>
        <CustomCol xs={24} md={12} lg={12}>
          <InputDadosMetereologicos
            onInputChange={handleDadosMeteorologicosChange}
            value={dadosMeteorologicos}
          />
        </CustomCol>
        <Col span={20} style={{ margin: '0 auto', textAlign: 'center' }}>
          <Botoes onSave={handleSalvar} onCancel={() => console.log('Cancelar')} />
        </Col>
      </Row>
      <CenarioSucesso
        isOpen={showModalSucesso}
        onClose={() => setModalSucesso(false)}
        validateFields={validateFields}
      />
      <ModalErro isOpen={showModalErro} onClose={() => setModalErro(false)} />
    </PageContainer>
  );
};

export default EditarFormulario;