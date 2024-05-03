import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from '@ant-design/icons'

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 16px;
    position: absolute;
    width: 466px;
    height: 125px;
    left: 120px;
    top: 242px;
`

const Titulo = styled.div`
    width: 226px;
    height: 39px;
    font-family: 'TTSupermolot-Regular';
    font-size: 32px;
    font-weight: 400;
    line-height: 39px;
    color: #292929;
    flex: none;
    order: 0;
    flex-grow: 0;
`

const Subtitulo = styled.div`
    width: 62px;
    height: 22px;
    font-family: 'TTSupermolot-Regular';
    font-size: 18px;
    font-weight: 400;
    line-height: 22.14px;
    color: #292929;
    flex: none;
    order: 0;
    flex-grow: 0;
`

const StyledInput = styled(Input)`
  &.ant-input {
    width: 100%;
    height: 40px;
    background-color: #FFFFFF;
    font-family: 'TTSupermolot-Regular';
    font-size: 18px;
    font-weight: 400;
    line-height: 22.14px;
    text-align: left;
    padding-right: 40px;
  }

  &:not(:focus) {
    border: 2px solid #414ABA;  
  }
`

const StyledSearchIcon = styled(SearchOutlined)`
    font-size: 18px;
    color: #414ABA;
    border-radius: 50%;
    cursor: pointer;
    padding: 4px; 
`;

const InputBusca = () => {

    return (
        <div>
            <InputContainer>
                <Titulo>Buscar a cidade</Titulo>
                <Subtitulo>Cidade*</Subtitulo>
                <StyledInput size='large'
                    placeholder='Busque por uma cidade'
                    suffix={<StyledSearchIcon />}
                >
                </StyledInput>
            </InputContainer>
        </div>
    );
};

export default InputBusca;