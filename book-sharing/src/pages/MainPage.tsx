import { useEffect, useState } from "react";
import { Book } from "../components/books/book";
import { useAuth } from "../context/AuthContext";
import { PostPage } from './PostPage'

type Post = {
    id: number
    post_title: string
    book_name: string
    rating: number
    review: string
    image_path: string | null
    purchase_url: string
    author: string
}

export function MainPage() {
    const [search, setSearch]             = useState(true);
    const [isPostOpen, setIsPostOpen]     = useState(false);
    const [posts, setPosts]               = useState<Post[]>([])

    const { logout } = useAuth()

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://127.0.0.1:9000/posts',{
                method: 'GET',
            })
           if (res.ok) setPosts(await res.json())
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

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
                {posts.length === 0 ? (
                    <p className='text-gray-400'>まだ投稿がありません</p>
                ) : (
                    posts.map(post => (
                        <Book
                            key={post.id}
                            image={post.image_path ? `http://127.0.0.1:9000/${post.image_path}` : '/public/images/user.png'}
                            summary_title={post.post_title}
                            book_title={post.book_name}
                            author={post.author}
                            like={0}
                        />
                    ))
                )}
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
                        <PostPage onSuccess={() => {
                            setIsPostOpen(false)
                            fetchPosts()
                        }} />
                    </div>
                </div>
        )}

        <button onClick={() => setIsPostOpen(true)} className='fixed bottom-8 right-8 w-14 h-14 bg-teal-600 hover:bg-teal.500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl z-30 transition-colors'>
            ✏️
        </button>
    </div>
    )

}