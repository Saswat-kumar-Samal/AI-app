import React from 'react';
import {useState} from "react";
import ReactMarkdown from 'react-markdown'

const CreationItems = ( {Itm} ) => {

    const [expand, setExpand] = useState(false);

  return (
    <div onClick={() => setExpand(!expand)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'>
        <div className='flex justify-between items-center gap-4'>
            <div>
                <h2>{Itm.prompt}</h2>
                <p className={'text-gray-500'}>{Itm.type} - {new Date(Itm.created_at).toLocaleDateString()}</p>
            </div>
            <button className={'bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'}>{Itm.type}</button>
        </div>
        {
            expand && (
                <div>
                    {
                        Itm.type === 'image' ? (
                            <div>
                                <img src={Itm.content} alt="image" className='mt-3 w-full max-w-md'/>
                            </div>
                        ) : (

                            <div className='mt-6 h-full overflow-y-scroll text-sm text-slate-600'>
                                <div className='reset-tw'>
                                    <ReactMarkdown>{Itm.content}</ReactMarkdown>
                                </div>
                            </div>

                        )
                    }
                </div>
            )
        }
    </div>
  );
};

export default CreationItems;
