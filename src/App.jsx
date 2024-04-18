import { ThemeProvider,createTheme } from '@mui/material'
import { defaultTheme } from './assets/defaultTheme'
import './App.css'
import Login from './components/Login'
import AppRoutes from './Routes';

function App() {

  const theme = createTheme(defaultTheme)
  
  return (
    <>
      <ThemeProvider theme={theme} >
        <AppRoutes>
          <Login />
        </AppRoutes>
      </ThemeProvider>
    </>
  )
}

export default App