import { AuthProvider, useAuth} from './context/AuthContext.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import './App.css'
import { Header } from './components/header/page.tsx'
import { MainPage } from './pages/MainPage.tsx'

function AppContent() {
  const { isLoggedIn, logout } = useAuth()

  if (!isLoggedIn) return <LoginPage />
  else return <MainPage />

}


function App() {


  return (
    <AuthProvider>
      <Header />
      <AppContent></AppContent>
    </AuthProvider>
  )

}

export default App
