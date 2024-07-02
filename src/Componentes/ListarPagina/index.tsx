import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, message, Modal } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import GlobalStyles from '../EstiloGlobal';
import InputBusca from '../InputBusca';
import Titulo from '../Titulo';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ColumnType, ExpandableConfig } from 'antd/es/table/interface';

const StyledTableContainer = styled.div`
  .ant-table {
    font-family: 'TT-Supermolot-Regular';
    margin-left: 120px;
    margin-right: 20px;
    margin-top: 40px;
  }

  .ant-table-thead > tr > th {
    font-family: 'TT-Supemolot-Bold';
  }

  .expand-icon {
    font-size: 16px;
    color: #141aba;
    border: 2px solid #141aba;
  }
`;

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

interface DadosMeteorologicos {
  id: number;
  data: Date;
  cidade: string;
  temperaturaMinima: number;
  temperaturaMaxima: number;
  clima: Clima;
  turno: Turno;
  precipitacao: number;
  umidade: number;
  velocidadeVento: number;
}

interface ListarPaginaProps {}

const ListarPagina: React.FC<ListarPaginaProps> = () => {
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState<DadosMeteorologicos[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [recordToDelete, setRecordToDelete] = useState<DadosMeteorologicos | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarDadosMeteorologicos = async () => {
      try {
        const url = cidadeSelecionada
          ? `http://localhost:8080/tempo/previsao/todasPorCidade?cidade=${cidadeSelecionada}`
          : 'http://localhost:8080/tempo/previsao/todas';

        const response = await axios.get<DadosMeteorologicos[]>(url);
        const data = response.data;

        if (Array.isArray(data)) {
          setDadosMeteorologicos(data);
        } else {
          setDadosMeteorologicos([data]);
        }
      } catch (error) {
        console.error('Erro ao buscar dados meteorológicos:', error);
      }
    };

    buscarDadosMeteorologicos();
  }, [cidadeSelecionada]);

  const renderTags = (turno: Turno) => {
    let color;
    let backgroundColor;
    switch (turno) {
      case Turno.MANHA:
        color = '#FAAD14';
        backgroundColor = '#FFFBE6';
        break;
      case Turno.TARDE:
        color = '#FA541C';
        backgroundColor = '#FFF2E8';
        break;
      case Turno.NOITE:
        color = '#722ED1';
        backgroundColor = '#F9F0FF';
        break;
      default:
        color = '#000000';
        backgroundColor = '#FFFFFF';
    }
    return (
      <Tag key={turno} style={{ color: color, backgroundColor: backgroundColor }}>
        {turno}
      </Tag>
    );
  };

  const handleEdit = (record: DadosMeteorologicos) => {
    navigate(`/editar/${record.id}`, { state: { record } });
  };

  const showDeleteModal = (record: DadosMeteorologicos) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      if (!recordToDelete) return;

      await axios.delete(`http://localhost:8080/tempo/previsao/${recordToDelete.id}`);
      message.success('Registro excluído com sucesso');
      setDadosMeteorologicos((prevData) => prevData.filter((item) => item.id !== recordToDelete.id));
    } catch (error) {
      message.error('Erro ao excluir registro');
    } finally {
      setIsDeleteModalVisible(false);
      setRecordToDelete(null);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setRecordToDelete(null);
  };

  const columns: ColumnType<DadosMeteorologicos>[] = [
    { title: 'Data', dataIndex: 'data', key: 'data' },
    { title: 'Cidade', dataIndex: 'cidade', key: 'cidade' },
    { title: 'Temperatura Mínima', dataIndex: 'temperaturaMinima', key: 'temperaturaMinima' },
    { title: 'Temperatura Máxima', dataIndex: 'temperaturaMaxima', key: 'temperaturaMaxima' },
    { title: 'Clima', dataIndex: 'clima', key: 'clima' },
    {
      title: 'Turno',
      dataIndex: 'turno',
      key: 'turno',
      render: (turno: Turno) => renderTags(turno),
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, record: DadosMeteorologicos) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)} style={{ color: '#141ABA' }}>
            Editar
          </a>
          <a onClick={() => showDeleteModal(record)} style={{ color: '#141ABA' }}>
            Excluir
          </a>
        </Space>
      ),
    },
  ];

  const expandable: ExpandableConfig<DadosMeteorologicos> = {
    expandedRowRender: (record: DadosMeteorologicos) => (
      <table style={{ width: '350px' }}>
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
        <MinusOutlined onClick={(e) => onExpand(record, e)} className="expand-icon" />
      ) : (
        <PlusOutlined onClick={(e) => onExpand(record, e)} className="expand-icon" />
      ),
  };

  const handleSearch = (cidade: string) => {
    setCidadeSelecionada(cidade);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <GlobalStyles />
      <Titulo texto="Lista de Dados Meteorológicos" marginLeft="124px" />
      <InputBusca marginLeft="124px" marginTop="40px" onSearch={handleSearch} />
      <StyledTableContainer>
        <Table
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
            position: ['bottomCenter'],
          }}
          expandable={expandable}
          locale={{
            emptyText: (
              <span style={{ fontFamily: 'TT-Supermolot-Regular', fontWeight: '400', fontSize: '18px', color: '#000000' }}>
                Não há dados cadastrados
              </span>
            ),
          }}
          scroll={{ x: 'max-content' }}
        />
      </StyledTableContainer>
      <Modal
        title="Confirmar Exclusão"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Excluir"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir este registro?</p>
      </Modal>
    </>
  );
};

export default ListarPagina;
