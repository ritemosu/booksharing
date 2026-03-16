import { FcLikePlaceholder } from "react-icons/fc";
import { BsShare } from "react-icons/bs";

type Book = {
    image: string;
    summary_title: string;
    book_title: string;
    author: string;
    like: number;
}
// write props
export function Book({image = "/public/images/user.png", summary_title = "これが面白い！！", book_title = "TestTitle", author = "TestAuthor", like = 100}: Book) {

    return (
        <div className='rounded-3xl border-2 p-5 bg-gray-800 overflow-hidden flex items-center flex-col'>
            <img src={`${image}`} alt="" className='w-30 h-30 object-cover'/>
            <h2>{summary_title}</h2>
            <h3>Title: {book_title}</h3>
            <h4>Author: {author}</h4>
            <div className='flex items-center gap-4 mt-3'>
                <div className='rounded-full p-2 border-cyan-100 border-2 hover:cursor-pointer hover:border-cyan-400 transition-colors duration-200'><FcLikePlaceholder /></div>
                <div className='rounded-full p-2 border-cyan-100 border-2 hover:cursor-pointer hover:border-cyan-400'><BsShare /></div>
            </div>
        </div>
    )

}