import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { BsShare } from "react-icons/bs";

type Book = {
    image: string;
    summary_title: string;
    book_title: string;
    author: string;
    like: number;
    review?: string;
    purchase_url?: string;
    rating?: number
}
// write props
export function Book({image = "/public/images/user.png",
                      summary_title = "これが面白い！！", 
                      book_title = "TestTitle", 
                      author = "TestAuthor", 
                      like = 100, 
                      review = "", 
                      purchase_url="",
                      rating=0}: Book) {

    const [clicked, setClicked] = useState<boolean>(false);

    return (
        <>
            <div className='rounded-3xl border-2 p-5 bg-gray-800 overflow-hidden flex items-center flex-col w-75 h-80.5 group cursor-pointer' onClick={() => setClicked(!clicked)}>
                <img src={`${image}`} alt="" className='w-50 h-30 object-cover cursor-pointer mb-5 transition-transform duration-300 group-hover:scale-110'/>
                <h2 className="cursor-pointer">{summary_title}</h2>
                <h3 className="cursor-pointer">Title: {book_title}</h3>
                <h4 className="cursor-pointer">Author: {author}</h4>
                <div className='flex items-center gap-4 mt-3'>
                    <div className='rounded-full p-2 border-cyan-100 border-2 hover:cursor-pointer hover:border-cyan-400 transition-colors duration-200' onClick={e => e.stopPropagation()}><FcLikePlaceholder /></div>
                    <div className='rounded-full p-2 border-cyan-100 border-2 hover:cursor-pointer hover:border-cyan-400' onClick={e => e.stopPropagation()}><BsShare /></div>
                </div>
            </div>

            {clicked && (
                <div
                    className='fixed inset-0 bg-black/60 z-40 flex items-center justify-center'
                    onClick={() => setClicked(false)}
                >
                    <div
                        className='bg-gray-900 rounded-2xl max-h-200 w-full max-w-2xl mx-4 p-11 relative overflow-y-scroll'
                        onClick={e => e.stopPropagation()}
                    >
                        {/* 閉じるボタン */}
                        <div
                            onClick={() => setClicked(false)}
                            className='absolute top-2 right-3.5 font-[5rem] cursor-pointer text-gray-400 hover:text-white'
                        >
                            <p className='text-2xl font-bold'>✕</p>
                        </div>

                        {/* 画像 */}
                        <img src={image} alt="" className='w-full h-auto  rounded-xl mb-4'/>

                        {/* タイトル */}
                        <h2 className='text-lg font-bold text-white mb-3'>{summary_title}</h2>
                        <h3 className='text-sm text-gray-400 mb-1'>📖 {book_title}</h3>
                        <h3 className='text-sm text-gray-400 mb-1'>✍️ {author}</h3>

                        {/* 評価 */}
                        {rating > 0 && (
                            <h3 className='text-amber-400 mb-8'>
                                {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                            </h3>
                        )}

                        {/* 本文 */}
                        <p className='text-sm text-gray-300 leading-relaxed whitespace-pre-wrap mb-4'>
                            {review || '感想が記載されていません'}
                        </p>

                        {/* 購入リンク */}
                        {purchase_url && (
                            <a
                                href={purchase_url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-block text-xs text-teal-400 hover:text-teal-300 border border-teal-700 px-3 py-1.5 rounded-lg transition-colors'
                            >
                                🛒 購入リンクを開く
                            </a>
                        )}
                    </div>
                </div>
            )}

        </>
    )

}