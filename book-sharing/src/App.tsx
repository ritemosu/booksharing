import { AuthProvider, useAuth} from './context/AuthContext.tsx'
import { useState } from 'react'
import { LoginPage } from './pages/LoginPage.tsx'
import './App.css'
import { Header } from './components/header/page.tsx'
import { MainPage } from './pages/MainPage.tsx'

function AppContent() {
  const { isLoggedIn, username } = useAuth()
  const [myBooksUser, setMyBooksUser ] = useState<string>('')

  if (!isLoggedIn) return (
    <>
      <Header onMyBooks={() => setMyBooksUser(username)}/>
      <LoginPage />
    </>
  )
  else return (
    <>
      <Header onMyBooks={() => setMyBooksUser(username)} />
      <MainPage myBookUsers={myBooksUser} onMyBooksConsumed={() => setMyBooksUser('')} />
    </>
  )

}


function App() {


  return (
    <AuthProvider>
      <AppContent></AppContent>
    </AuthProvider>
  )

}

export default App
