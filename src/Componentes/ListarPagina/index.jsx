import React, { useState, useEffect } from "react";
import { Table, Tag, Space, message, Modal } from "antd";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GlobalStyles from "../EstiloGlobal";
import InputBusca from "../InputBusca";
import Titulo from "../Titulo";

const StyledTable = styled(Table)`
  .ant-table {
    font-family: 'TT-Supermolot-Regular';
    margin-left: 120px;
    display: flex;
    margin-top: 40px;
  }

  .ant-table-thead > tr > th {
    font-family: "TT-Supemolot-Bold";
  }
`;

const ListarPagina = () => {
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarDadosMeteorologicos = async () => {
      if (cidadeSelecionada) {
        try {
          const response = await axios.get(`http://localhost:8080/tempo/previsao/todasPorCidade?cidade=${cidadeSelecionada}`);
          const data = response.data;

          if (Array.isArray(data)) {
            setDadosMeteorologicos(data);
          } else {
            setDadosMeteorologicos([data]);
          }
        } catch (error) {
          console.error("Erro ao buscar dados meteorológicos:", error);
        }
      }
    };

    buscarDadosMeteorologicos();
  }, [cidadeSelecionada]);

  const renderTags = (turno) => {
    let color;
    let backgroundColor;
    switch (turno) {
      case 'MANHA':
        color = '#FAAD14'; 
        backgroundColor = '#FFFBE6';
        break;
      case 'TARDE':
        color = '#FA541C'; 
        backgroundColor = '#FFF2E8';
        break;
      case 'NOITE':
        color = '#722ED1'; 
        backgroundColor = '#F9F0FF';
        break;
      default:
        color = '#000000';
        backgroundColor = '#FFFFFF';
    }
    return (
      <Tag 
        key={turno} 
        style={{ color: color, backgroundColor: backgroundColor }}
      >
        {turno.toUpperCase()}
      </Tag>
    );
  };

  const handleEdit = (record) => {
    navigate('/', { state: { record } });
  };

  const showDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/tempo/previsao/${recordToDelete.id}`);
      message.success('Registro excluído com sucesso');
      setDadosMeteorologicos(prevData => prevData.filter(item => item.id !== recordToDelete.id));
    } catch (error) {
      message.error('Erro ao excluir registro');
    } finally {
      setIsModalVisible(false);
      setRecordToDelete(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setRecordToDelete(null);
  };

  const columns = [
    { title: 'Data', dataIndex: 'data', key: 'data' },
    { title: 'Cidade', dataIndex: 'cidade', key: 'cidade' },
    { title: 'Temperatura Mínima', dataIndex: 'temperaturaMinima', key: 'temperaturaMinima' },
    { title: 'Temperatura Máxima', dataIndex: 'temperaturaMaxima', key: 'temperaturaMaxima' },
    { title: 'Clima', dataIndex: 'clima', key: 'clima' },
    { 
      title: 'Turno', 
      dataIndex: 'turno', 
      key: 'turno', 
      render: (turno) => renderTags(turno)
    },
    { title: 'Precipitação', dataIndex: 'precipitacao', key: 'precipitacao' },
    { title: 'Umidade', dataIndex: 'umidade', key: 'umidade' },
    { title: 'Velocidade do Vento', dataIndex: 'velocidadeVento', key: 'velocidadeVento' },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Editar</a>
          <a onClick={() => showDeleteModal(record)}>Excluir</a>
        </Space>
      ),
    },
  ];

  const handleSearch = (cidade) => {
    setCidadeSelecionada(cidade);
  };

  return (
    <>
      <GlobalStyles />
      <Titulo texto="Lista de Dados Meteorológicos" marginLeft="124px" />
      <InputBusca
        marginLeft="124px"
        marginTop="40px"
        onSearch={handleSearch}
      />
        <StyledTable dataSource={dadosMeteorologicos} columns={columns} rowKey="id" />
      <Modal
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Excluir"
        cancelText="Cancelar"
        cancelButtonProps={{style: {color: '#141ABA', fontFamily: 'TT-Supermolot-Regular'}}}
        okButtonProps={{style: {backgroundColor: '#EF4C56', fontFamily: 'TT-Supermolot-Regular'}}}
      >
        <p style={{fontFamily: 'TT-Supermolot-Regular'}}>Você tem certeza que deseja excluir essa informação?</p>
      </Modal>
    </>
  );
};

export default ListarPagina;
