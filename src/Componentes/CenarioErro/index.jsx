import React from "react";
import { Modal } from "antd";
import {CloseOutlined} from '@ant-design/icons'
import styled from "styled-components";

const CustomModal = styled(Modal)`
  .ant-modal-content {
    background-color: #db0d33;
  }
`;

const CustomCloseIcon = styled(CloseOutlined)`
  color: #fafafa;
  font-size: 20px; 
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 18px 16px;
  gap: 24px;
  width: 755px;
  height: 178px;
  border-radius: 8px;
`;

const ErrorMessageText = styled.div`
  width: 675px;
  height: 142px;
  font-family: "TTSupermolot-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;
  display: flex;
  align-items: center;
  color: #fafafa;
`;

const CenarioErro = ({ isOpen, onClose }) => {
  return (
    <CustomModal visible={isOpen} onCancel={onClose} closeIcon={<CustomCloseIcon />} footer={null} width={755} centered maskClosable={false}>
      <ErrorMessage>
        <ErrorMessageText>
          Por favor, preencha todos os campos <br /> obrigatórios antes de salvar.
        </ErrorMessageText>
      </ErrorMessage>
    </CustomModal>
  );
};

export default CenarioErro;