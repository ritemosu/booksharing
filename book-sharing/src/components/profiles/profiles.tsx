import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export function Profile() {

    const { isLoggedIn, logout } = useAuth()

    const [clicked, setClicked] = useState<boolean>(false);

    return (
        <div className={`relative cursor-pointer ${isLoggedIn?'block':'hidden'}`} onClick={() => setClicked(!clicked)}>
            <div className='rounded-full bg-blue-400 w-10 h-10 flex mr-4 items-center justify-center overflow-hidden'>
                <img src="/public/images/user.png" alt="" className='w-10 h-10 object-cover'/>
            </div>
            <div className={`bg-blue-950 z-10 absolute right-0 top-12 px-3.5 text-center py-1.5 transition-opacity duration-200 
                border-[1.5px]
                border-amber-50
                blur-1xl
                shadow-md
                shadow-stone-700
                rounded-md
                ${clicked? 'opacity-100':'opacity-0'}` }
                onClick={logout}
                >
                <p className='font-bold text-[15px]'>Logout</p>
            </div>
        </div>
    )

}