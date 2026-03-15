import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import { Header } from './components/header/page.tsx'

function App() {

  const [search, setSearch] = useState(true);

  return (
    <>
      <Header />

      <div className={`flex text-center justify-center gap-12 mb-8`}>
        <div className={`text-2xl font-bold hover:text-cyan-300 hover:cursor-pointer ${search? 'text-blue-300': ''}`} onClick={() => setSearch(true)}>Searching for books</div>
        <div className={`text-2xl font-bold hover:text-cyan-300 hover:cursor-pointer ${search? '': 'text-blue-300'}`} onClick={() => setSearch(false)}>Searching for users</div>
      </div>

      {search ? (
        <p>Here is a Book Searching Area!</p>
      ) : (
        <p>Here is a user searching Area!</p>
      )}
    </>
  )

}

export default App
