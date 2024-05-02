import Breadcrumb from "./Componentes/BreadCrumb"
import Cabecalho from "./Componentes/Cabecalho"
import GlobalStyles from "./Componentes/EstiloGlobal"
import InputBusca from "./Componentes/InputBusca"
import InputTemperatura from "./Componentes/InputTemperatura"
import CadastroMeteorologico from "./Componentes/Titulo"

const App = () => (
    <>
      <GlobalStyles />
          <Cabecalho />
          <Breadcrumb />
          <CadastroMeteorologico />
          <InputBusca />
          <InputTemperatura />
    </>
  )

export default App