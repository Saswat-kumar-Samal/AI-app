import React from 'react';
import {useClerk, useUser, Protect} from "@clerk/clerk-react";
import {House, SquarePen, HashIcon, ImagePlayIcon, Eraser, Scissors, FileText, Users2, LogOut} from 'lucide-react'
import {NavLink} from 'react-router-dom'


const navItems = [
    {to:"/ai", label:"Dashboard", Icon:House},
    {to:"/ai/write-article", label:"Write Article", Icon:SquarePen},
    {to:"/ai/blog-titles", label:"Blog Titles", Icon:HashIcon},
    {to:"/ai/generate-images", label:"Generate Images", Icon:ImagePlayIcon},
    {to:"/ai/remove-background", label:"Remove Background", Icon:Eraser},
    {to:"/ai/remove-object", label:"Remove Object", Icon:Scissors},
    {to:"/ai/review-resume", label:"Review Resume", Icon:FileText},
    {to:"/ai/Community", label:"Community", Icon:Users2}
]

const SideBar = ({sidebar, setSidebar}) => {

    const {user} = useUser()
    const {signOut, openUserProfile} = useClerk()

    const HideSidebar = ()=>{
        return setSidebar(false)
    }

  return (
    <div className={`w-60 bg-white border-r border-gray-100 flex flex-col justify-between items-center 
    max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} 
    transition-all duration-400 ease-in-out`}>

        <div className='my-7 w-full'>

            <img src={user.imageUrl} alt="" className={'w-14 rounded-full mx-auto'}/>
            <h1 className='mt-2 text-center' >{user.fullName}</h1>

            <div className='w-[92%] ml-2 mt-10 px-2'>
                {
                    navItems.map(( {to, label, Icon} ) => (
                        <NavLink key={to} to={to} end={to === '/ai'}
                                 onClick={HideSidebar}
                                 className={( {isActive} ) => `h-9 px-3.5 flex items-center gap-4 rounded ${isActive ? 'bg-gradient-to-r from-[#001BB7] to-[#8FABD4] text-white' : 'bg-white'}`}>

                            {
                                ( {isActive} ) => (
                                    <>
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-900'}`}/>
                                        <div className={`${isActive ? 'text-[15px]' : 'text-[14px]'}`}>{label}</div>
                                    </>
                                )
                            }

                        </NavLink>
                    ))
                }
            </div>
        </div>

        <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
            <div className='flex gap-1 items-center cursor-pointer' onClick={openUserProfile}>
                <img src={user.imageUrl} alt="user Image" className={`w-8 rounded-full`}/>
                <div>
                    <h1 className={'text-[12px] font-bold'}>{user.fullName}</h1>
                    <p className='text-xs text-gray-500'>
                        <Protect plan='premium' fallback='free'>Premium</Protect>
                        Plan
                    </p>
                </div>
            </div>
            <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition duration-400 cursor-pointer'/>
        </div>

    </div>
  );
};

export default SideBar;
