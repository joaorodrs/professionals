import { Home } from "./pages/Home"
import { ThemeProvider } from "@material-ui/core/styles"

import { theme } from './config/theme'
import './styles/global.css'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  )
}

export default App
