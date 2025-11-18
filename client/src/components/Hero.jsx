import React from 'react';
import {useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";



const Hero = () => {

    const navigate = useNavigate()

  return (
    <div className='px-2 sm:px-10 relative inline-flex flex-col w-full justify-center
    bg-[url(../public/gradientBackground.png)] bg-cover bg-no-repeat py-40 pb-25'>

        <div className={'text-center mb-6'}>
            <h1 className={'text-3xl sm:text-5xl md:text-6xl ' +
                '2xl:text-7xl font-semibold mx-auto leading-[1.2]'}>Create Amazing content
                <br/> with <span className={'text-primery hover:translate-y-3 hover:translate-x-3 transition duration-500 cursor-pointer inline-block'}>AI tools</span></h1>
            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl
                            m-auto max-sm:text-xs text-gray-600'>
                Transform your content creation with out suite premium AI tools
            write articles, Generate Images and enhance your workflows</p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-sm'>
            <button onClick={()=> navigate('/ai')} className='bg-primery text-white px-10 py-3 rounded-lg
            hover:scale-105 active:scale-50 transform transition
            duration-500 ease-in-out cursor-pointer'>start creating now</button>

            <button className='bg-white px-10 py-3 rounded-lg border
            border-gray-500 hover:scale-106 transition active:scale-95 cursor-pointer'>Watch demo</button>
        </div>

        <div className='flex item-center mt-8 mx-auto text-gray-600 gap-5'>
            <img src={assets.user_group} alt="group image" className='h-8'/> Trusted by 10k people
        </div>
    </div>
  );
};

export default Hero;
