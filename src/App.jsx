import Breadcrumb from "./Componentes/BreadCrumb"
import Cabecalho from "./Componentes/Cabecalho"
import GlobalStyles from "./Componentes/EstiloGlobal"
import CadastroMeteorologico from "./Componentes/Titulo"

const App = () => (
    <>
      <GlobalStyles />
          <Cabecalho />
          <Breadcrumb />
          <CadastroMeteorologico />
    </>
  )

export default App