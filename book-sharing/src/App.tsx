import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import { Header } from './components/header/page.tsx'
import { Book } from './components/books/book.tsx'

function App() {

  const [search, setSearch] = useState(true);
  const [post, setPost]     = useState(false);

  return (
    <>
      <Header />

      <div className={`flex text-center justify-center gap-12 mb-8`}>
        <div className={`text-2xl font-bold hover:text-cyan-300 hover:cursor-pointer ${search? 'text-blue-300': ''}`} onClick={() => setSearch(true)}>Searching for books</div>
        <div className={`text-2xl font-bold hover:text-cyan-300 hover:cursor-pointer ${search? '': 'text-blue-300'}`} onClick={() => setSearch(false)}>Searching for users</div>
      </div>

      {search ? (
        <div className='transition-opacity duration-300'>
          <div className='mb-6'>Here is a Book Searching Area!</div>
          <div className='flex text-center justify-center flex-wrap gap-8'>
            <Book></Book>
            <Book></Book>
            <Book></Book>
          </div>
        </div>
      ) : (
        <p>Here is a user searching Area!</p>
      )}

      
    </>
  )

}

export default App
