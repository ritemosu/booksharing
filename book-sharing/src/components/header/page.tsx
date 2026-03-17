import { Profile } from '../profiles/profiles.tsx'

export function Header({ onMyBooks }: { onMyBooks: () => void }) {

    return (
        <>
            <header className=' sticky top-0 z-50 px-2 py-5 bg-gray-900 flex justify-between mb-7'>
                <div className='pl-3 font-bold text-2xl text-amber-50 align-middle'>Book<span className='text-blue-400'>Share</span></div>
                <div>
                    <Profile onMyBooks={onMyBooks}></Profile>
                </div>
            </header>
        </>
    )

}