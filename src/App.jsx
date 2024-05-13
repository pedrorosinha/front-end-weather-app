import Botoes from "./Componentes/Botoes"
import Breadcrumb from "./Componentes/BreadCrumb"
import Cabecalho from "./Componentes/Cabecalho"
import GlobalStyles from "./Componentes/EstiloGlobal"
import InputBusca from "./Componentes/InputBusca"
import InputDadosMetereologicos from "./Componentes/InputDadosMetereologicos"
import InputData from "./Componentes/InputData"
import InputTags from "./Componentes/InputTags"
import InputTemperatura from "./Componentes/InputTemperatura"
import InputTempo from "./Componentes/InputTempo"
import CadastroMeteorologico from "./Componentes/Titulo"

const App = () => (
    <>
      <GlobalStyles />
          <Cabecalho />
          <Breadcrumb />
          <CadastroMeteorologico />
          <InputBusca />
          <InputTemperatura />
          <InputTempo />
          <InputData />
          <InputTags />
          <InputDadosMetereologicos />  
          <Botoes />
    </>
  )

export default App