import React from 'react';
import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";
import {ArrowRight} from "lucide-react";
import {useClerk, UserButton , useUser} from '@clerk/clerk-react'

const Navbar = () => {

    const {user} = useUser();
    const {openSignIn} = useClerk();
    const navigate = useNavigate()


  return (
    <div className='fixed flex justify-between items-center z-5 w-full backdrop-blur-2xl py-3 px-4
    sm:px-20 xl:px-32'>
        <img src={ assets.logo } alt="" className='sm:w-44 w-32 cursor-pointer' onClick={() => navigate('/')}/>

        {
            user ? <UserButton /> : (
                <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-violet-800 text-red-100 px-10 py-2.5'>
                    Get Started <ArrowRight className='h-4 w-4'/>
                </button>
            )
        }
    </div>
  );
};

export default Navbar;
