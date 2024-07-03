import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import axios from 'axios';
import GlobalStyles from '../EstiloGlobal';
import Breadcrumb from '../BreadCrumb';
import InputBusca from '../InputBusca';
import InputDadosMeteorologicos from '../InputDadosMetereologicos'; 
import InputTags from '../InputTags';
import InputData from '../InputData';
import InputTempo from '../InputTempo';
import Botoes from '../Botoes';
import CenarioSucesso from '../CenarioSucesso';
import ModalErro from '../CenarioErro';
import InputTemperatura from '../InputTemperatura';
import dayjs from 'dayjs'

enum Clima {
  CHUVOSO = 'CHUVOSO',
  ENSOLARADO = 'ENSOLARADO',
  GAROANDO = 'GAROANDO',
  NEVANDO = 'NEVANDO',
  NUBLADO = 'NUBLADO',
}

enum Turno {
  MANHA = 'MANHA',
  TARDE = 'TARDE',
  NOITE = 'NOITE',
}

interface Props {
  record: {
    id: number;
    temperaturaMinima: number;
    temperaturaMaxima: number;
    turno: Turno;
    data: Date;
    clima: Clima;
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

  const [temperatura, setTemperatura] = useState<{ min: number | null; max: number | null }>({
    min: record.temperaturaMinima,
    max: record.temperaturaMaxima,
  });
  const [showModalSucesso, setModalSucesso] = useState<boolean>(false);
  const [showModalErro, setModalErro] = useState<boolean>(false);
  const [selectedTurno, setSelectedTurno] = useState<Turno>(record.turno);
  const [selectedDate, setSelectedDate] = useState<Date | null>(record.data);
  const [selectedClima, setSelectedClima] = useState<Clima | null>(record.clima);
  const [selectedBusca, setSelectedBusca] = useState<string>(record.cidade);
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState<{
    precipitacao: number | null;
    umidade: number | null;
    velocidadeVento: number | null;
  }>({
    precipitacao: record.precipitacao,
    umidade: record.umidade,
    velocidadeVento: record.velocidadeVento,
  });

  const handleTemperaturaChange = (value: { min: number | null; max: number | null }) => {
    setTemperatura(value);
  };

  const handleTurnoChange = (turno: Turno) => {
    setSelectedTurno(turno);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleClimaChange = (clima: Clima | null) => {
    setSelectedClima(clima);
  };

  const handleBuscaChange = (busca: string) => {
    setSelectedBusca(busca);
  };

  const handleDadosMeteorologicosChange = (dados: { precipitacao?: number | null; umidade?: number | null; velocidadeVento?: number | null }) => {
    setDadosMeteorologicos({
      ...dadosMeteorologicos,
      ...dados,
    });
  };

  const validateFields = () => {
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
        const formattedDate = selectedDate ? dayjs(selectedDate).format('DD/MM/YYYY') : null;
        const dados = {
          cidade: selectedBusca,
          turno: selectedTurno,
          clima: selectedClima,
          temperaturaMinima: temperatura.min!,
          temperaturaMaxima: temperatura.max!,
          precipitacao: dadosMeteorologicos.precipitacao,
          umidade: dadosMeteorologicos.umidade,
          velocidadeVento: dadosMeteorologicos.velocidadeVento,
          data: formattedDate,
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
          <InputDadosMeteorologicos
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