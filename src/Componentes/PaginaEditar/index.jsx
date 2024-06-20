import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Form, Button, message } from 'antd';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalStyles from '../EstiloGlobal';
import Breadcrumb from '../BreadCrumb';
import InputBusca from '../InputBusca';
import InputTemperatura from '../InputTemperatura';
import InputTempo from '../InputTempo';
import InputTags from '../InputTags';
import InputData from '../InputData';
import InputDadosMetereologicos from '../InputDadosMetereologicos';
import CenarioSucesso from '../CenarioSucesso';
import Titulo from '../Titulo';
import ModalErro from '../CenarioErro';

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

const UpdateForm = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state?.record;

  const [showModalSucesso, setModalSucesso] = useState(false);
  const [showModalErro, setModalErro] = useState(false);

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record, form]);

  const handleAtualizar = async (values) => {
    try {
      await axios.put(`${API_URL}/tempo/previsao/${record.id}`, values);
      message.success('Registro atualizado com sucesso');
      setModalSucesso(true);

      navigate('/listar');
    } catch (error) {
      setModalErro(true);
      console.log("Erro!", error);
    }
  };

  return (
    <PageContainer>
      <GlobalStyles />
      <Breadcrumb />
      <Titulo />
      <Row gutter={[16, 16]} style={{ marginTop: '32px', rowGap: '16px', maxWidth: '95%', marginLeft: '121px', marginRight: 'auto', justifyContent: 'center' }}>
        <Form form={form} onFinish={handleAtualizar} layout="vertical">
          <CustomCol xs={24} md={12} lg={12}>
            <Form.Item name="cidade" label="Cidade" rules={[{ required: true }]}>
              <InputBusca style={{ marginTop: '40px', textAlign: 'center' }} />
            </Form.Item>
          </CustomCol>
          <CustomCol xs={24} md={12} lg={12}>
            <Form.Item name="data" label="Data" rules={[{ required: true }]}>
              <InputData />
            </Form.Item>
          </CustomCol>
          <CustomCol xs={24} md={12} lg={12}>
            <Form.Item name="temperatura" label="Temperatura" rules={[{ required: true }]}>
              <InputTemperatura />
            </Form.Item>
          </CustomCol>
          <CustomCol xs={24} md={12} lg={12}>
            <Form.Item name="turno" label="Turno" rules={[{ required: true }]}>
              <InputTags />
            </Form.Item>
          </CustomCol>
          <CustomCol xs={24} md={12} lg={12}>
            <Form.Item name="clima" label="Clima" rules={[{ required: true }]}>
              <InputTempo style={{ marginTop: '86px', textAlign: 'center' }} />
            </Form.Item>
          </CustomCol>
          <CustomCol xs={24} md={12} lg={12}>
            <Form.Item name="dadosMetereologicos" label="Dados Meteorológicos" rules={[{ required: true }]}>
              <InputDadosMetereologicos />
            </Form.Item>
          </CustomCol>
          <Col span={20} style={{ margin: '0 auto', textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Atualizar
            </Button>
          </Col>
        </Form>
      </Row>
      <CenarioSucesso
        isOpen={showModalSucesso}
        onClose={() => setModalSucesso(false)}
        form={form}
      />
      <ModalErro isOpen={showModalErro} onClose={() => setModalErro(false)} />
    </PageContainer>
  );
};

export default UpdateForm;