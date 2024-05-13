import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import styled from "styled-components";

const CustomModal = styled(Modal)`
  .ant-modal-content {
    background-color: #07A24C;
    border-radius: 8px; 
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
  height: 200px;
  background: #07A24C;
  border-radius: 8px;
`;

const SuccessMessage = styled.div`
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
      open={isOpen} 
      onClose={onClose}
      closeIcon={<CustomCloseIcon />}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      fullWidth
      maxWidth="sm"
    >
      <SuccessModalContent>
        {isFormComplete ? (
          <>
            <SuccessMessage>
              Dados salvos com sucesso!
            </SuccessMessage>
            <Botoes
              onCancel={onClose}
              onSave={onClose}
              isFormComplete={isFormComplete}
            />
          </>
        ) : (
          <div>Formulário não completo</div>
        )}
      </SuccessModalContent>
    </CustomModal>
  );
};

export default CenarioSucesso;