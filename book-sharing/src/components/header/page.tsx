import { Profile } from '../profiles/profiles.tsx'

export function Header() {

    return (
        <>
            <header className='px-2 py-5 bg-gray-900 flex justify-between mb-7'>
                <div className='pl-3 font-bold text-2xl text-amber-50 align-middle'>Book<span className='text-blue-400'>Share</span></div>
                <div>
                    <Profile></Profile>
                </div>
            </header>
        </>
    )

}