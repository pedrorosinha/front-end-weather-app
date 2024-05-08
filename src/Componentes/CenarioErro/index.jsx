import React from "react";
import { Modal } from "antd";
import styled from "styled-components";

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 18px 16px;
  gap: 24px;
  width: 755px;
  height: 178px;
  background: #db0d33;
  border-radius: 8px;
`;

const ErrorMessageText = styled.div`
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
    <Modal visible={isOpen} onCancel={onClose} footer={null} width={755}>
      <ErrorMessage>
        <ErrorMessageText>
          Por favor, preencha todos os campos obrigatórios antes de salvar.
        </ErrorMessageText>
      </ErrorMessage>
    </Modal>
  );
};

export default CenarioErro;