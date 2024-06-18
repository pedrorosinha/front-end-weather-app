import React, { useState, useEffect } from "react";
import { Table, Tag, Space, message, Modal } from "antd";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GlobalStyles from "../EstiloGlobal";
import InputBusca from "../InputBusca";
import Titulo from "../Titulo";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const StyledTable = styled(Table)`
  .ant-table {
    font-family: 'TT-Supermolot-Regular';
    margin-left: 120px;
    margin-right: 20px;
    margin-top: 40px;
  }

  .ant-table-thead > tr > th {
    font-family: "TT-Supemolot-Bold";
  }

  .expand-icon {
    font-size: 16px;
    color: #141ABA;
    border: 2px solid #141ABA;  
  }
`;

const ListarPagina = () => {
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate();

  useEffect(() => {
    const buscarDadosMeteorologicos = async () => {
      try {
        const url = cidadeSelecionada
          ? `http://localhost:8080/tempo/previsao/todasPorCidade?cidade=${cidadeSelecionada}`
          : 'http://localhost:8080/tempo/previsao/todas';
        
        const response = await axios.get(url);
        const data = response.data;

        if (Array.isArray(data)) {
          setDadosMeteorologicos(data);
        } else {
          setDadosMeteorologicos([data]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados meteorológicos:", error);
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
    { 
      title: 'Cidade', 
      dataIndex: 'cidade', 
      key: 'cidade',
    },
    { 
      title: 'Temperatura Mínima', 
      dataIndex: 'temperaturaMinima', 
      key: 'temperaturaMinima', 
      render: (texto) => `${texto} ºC`},
    { 
      title: 'Temperatura Máxima', 
      dataIndex: 'temperaturaMaxima', 
      key: 'temperaturaMaxima',
      render: (texto) => `${texto} ºC` },
    { title: 'Clima', dataIndex: 'clima', key: 'clima' },
    { 
      title: 'Turno', 
      dataIndex: 'turno', 
      key: 'turno', 
      render: (turno) => renderTags(turno)
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)} style={{ color: '#141ABA' }}>Editar</a>
          <a onClick={() => showDeleteModal(record)} style={{color: '#141ABA'}}>Excluir</a>
        </Space>
      ),
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <table style={{ width: "350px" }}>
        <thead>
          <tr>
            <th>Precipitação</th>
            <th>Umidade</th>
            <th>Velocidade do Vento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{record.precipitacao} mm</td>
            <td>{record.umidade} %</td>
            <td>{record.velocidadeVento} km/h</td>
          </tr>
        </tbody>
      </table>
    ),
    expandIcon: ({ expanded, onExpand, record }) =>
      expanded ? (
        <MinusOutlined onClick={e => onExpand(record, e)} className="expand-icon" />
      ) : (
        <PlusOutlined onClick={e => onExpand(record, e)} className="expand-icon" />
      ),
  };

  const handleSearch = (cidade) => {
    setCidadeSelecionada(cidade);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
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
      <StyledTable 
        dataSource={dadosMeteorologicos} 
        columns={columns} 
        rowKey="id"
        pagination={{ 
          pageSize: 10,
          total: dadosMeteorologicos.length,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          current: currentPage,
          onChange: handlePageChange,
          showQuickJumper: true,
          showSizeChanger: true,
          position: ['bottomCenter'] 
        }}
        expandable={expandable}
        locale={{emptyText: <span style={{fontFamily: 'TT-Supermolot-Regular', fontWeight: '400', fontSize: '18px', color: '#000000'}}>Não há dados cadastrados</span>}}
        scroll={{ x: 'max-content' }}
      />
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