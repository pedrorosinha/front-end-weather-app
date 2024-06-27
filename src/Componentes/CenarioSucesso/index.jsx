import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import styled from "styled-components";

const CustomModal = styled(Modal)`
  .ant-modal-content {
    background-color: #07A24C;
  }
`;

const CustomCloseIcon = styled(CloseOutlined)`
  color: #fafafa;
  font-size: 20px;
  cursor: pointer;
`;

const SuccessModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 24px;
  width: 663px;
  height: 154px;
  border-radius: 8px;
`;

const SuccessMessage = styled.div`
  height: 106px;
  width: 567px;
  align-items: center;
  font-family: 'TTSupermolot-Regular';
  font-size: 32px;
  line-height: 39px;
  color: #fafafa;
`;

const CenarioSucesso = ({ isOpen, onClose, validateFields }) => {
  const [isFormComplete, setIsFormComplete] = useState(false);

  const validateFormFields = () => {
    const isValid = validateFields();
    setIsFormComplete(isValid);
  };

  useEffect(() => {
    if (isOpen) {
      validateFormFields();
    }
  }, [isOpen, validateFields]);

  return (
    <CustomModal
      visible={isOpen} 
      onCancel={onClose}
      closeIcon={<CustomCloseIcon />}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      centered
      footer={null}
    >
      <SuccessModalContent>
        {isFormComplete ? (
          <SuccessMessage 
          data-testid="modal-sucesso">
            Dados salvos com sucesso!
          </SuccessMessage>
        ) : (
          <div>Formulário não completo</div>
        )}
      </SuccessModalContent>
    </CustomModal>
  );
};

export default CenarioSucesso;