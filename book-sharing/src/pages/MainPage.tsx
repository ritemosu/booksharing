import { useState } from "react";
import { Book } from "../components/books/book";
import { useAuth } from "../context/AuthContext";
import { PostPage } from './PostPage'

export function MainPage() {
    const [search, setSearch] = useState(true);
    const [isPostOpen, setIsPostOpen]     = useState(false);

    const { logout } = useAuth()

    return (
    <div className='relative min-h-screen'>
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
        <p onClick={() => logout()}>Here is a user searching Area!</p>
        )}

        { isPostOpen && (
                <div
                className="fixed inset-0 bg-[black]/50  z-40 flex items-center justify-center"
                onClick={e => { if (e.target === e.currentTarget) setIsPostOpen(false) }}
                >
                    <div className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={() => setIsPostOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl z-50"
                        >
                            ✕
                        </button>
                        <PostPage onSuccess={() => setIsPostOpen(false)} />
                    </div>
                </div>
        )}

        <button onClick={() => setIsPostOpen(true)} className='fixed bottom-8 right-8 w-14 h-14 bg-teal-600 hover:bg-teal.500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl z-30 transition-colors'>
            ✏️
        </button>
    </div>
    )

}