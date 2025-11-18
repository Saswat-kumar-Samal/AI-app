import React from 'react';
import {PricingTable} from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-20 mt-5'>

        <div className='text-center'>
            <h2 className={'text-slate-700 text-[42px] font-semibold'}>choose your Plan</h2>
            <p className='text-gray-500 max-w-lg mx-auto'>Start for free scale up as you grow . Find the perfect plan for
            your content creation ne eds.</p>
        </div>

        <div className='mt-14 max-sm:mx-8'>
            <PricingTable />
        </div>

    </div>
  );
};

export default Plan;
