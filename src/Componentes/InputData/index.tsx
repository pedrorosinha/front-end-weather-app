import React, { useState } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import { PickerProps } from "antd/es/date-picker/generatePicker";
import dayjs from "dayjs";

const Container = styled.div`
  display: grid;
  margin-bottom: 16px;
`;

const Titulo = styled.div`
  font-family: 'TTSupermolot-Regular';
  font-size: 32px;
  font-weight: 400;
  color: #292929;
  margin: 44px 0 16px;
`;

const Subtitulo = styled.div`
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: 400;
  color: #292929;
  margin-bottom: 8px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 200px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid #414ABA;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: 400;
  color: #292929;
  .ant-picker-suffix {
    color: #414ABA;
  }
`;

interface InputDataProps {
  value?: Date | null;
  onInputChange?: (value: Date | null) => void;
}

const InputData: React.FC<InputDataProps> = ({ value, onInputChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  const handleDateChange: PickerProps<any>['onChange'] = (date, dateString) => {
    setSelectedDate(date);
    if (onInputChange) {
      onInputChange(date);
    }
  };

  const validateField = () => {
    return selectedDate !== null;
  };

  return (
    <Container>
      <Titulo>Informe a data</Titulo>
      <Subtitulo>Data*</Subtitulo>
      <StyledDatePicker
        placeholder="Selecione a data"
        format="DD/MM/YYYY"
        locale={locale}
        onChange={handleDateChange}
        value={selectedDate ? dayjs(selectedDate) : null}
        data-testid="input-data"
      />
      {!validateField() && <div style={{ color: 'red', marginTop: '8px' }}>Informe a data.</div>}
    </Container>
  );
};

export default InputData;
