import React, { useState } from "react";
import { DatePicker } from "antd";
import styled from "styled-components";
import locale from "antd/es/date-picker/locale/pt_BR";

const Container = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const Titulo = styled.div`
  position: absolute;
  width: 236px;
  height: 39px;
  left: 709px;
  top: 261px;
  font-family: 'TTSupermolot-Regular';
  font-size: 32px;
  font-weight: 400;
  line-height: 39px;
  color: #292929;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  position: absolute;
  width: 200px;
  height: 68px;
  left: 709px;
  top: 316px;
`;

const Subtitulo = styled.div`
  width: 45px;
  height: 22px;
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  color: #292929;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  border-radius: 6px;
  border: 2px solid #414ABA;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  color: #292929;
  .ant-picker-suffix {
    color: #414ABA;
  }
`;

const InputData = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const validateField = () => {
    return selectedDate !== null && selectedDate !== undefined && selectedDate !== '';
  };

  return (
    <Container>
      <Titulo>Selecione a data</Titulo>
      <DateContainer>
        <Subtitulo>Data*</Subtitulo>
        <StyledDatePicker
          placeholder="Selecione a data"
          format="DD/MM/YYYY"
          locale={locale}
          onChange={handleDateChange}
        />
        {!validateField() && <div style={{ color: 'red' }}>Selecione uma data.</div>}
      </DateContainer>
    </Container>
  );
};

export default InputData;