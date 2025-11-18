import React, {useState} from 'react';
import {Sparkles, Edit3Icon} from 'lucide-react'

const WriteArticle = () => {

    const articleLength = [
        {length:800, text : 'Short (500-800 word)'},
        {length:1200, text : 'medium (800-1200 word)'},
        {length:1600, text : 'Long (1200+ words)'}
    ]

    const [selectedLength, setSelectedLength] = useState(articleLength[0])
    const [input, setInput] = useState('')


    const onSubmitHandler = async (e) => {
        e.preventDefault()
    }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-15 text-slate-600'>
        {/* left column*/}

        <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-600'>
            <div className='flex items-center gap-6'>
                <Sparkles className='w-6 text-[#4A7AFF]'/>
                <h1 className='text-xl font-semibold'>Article Configuration</h1>
            </div>
            <p className='mt-6 text-sm font-medium ml-2'>Article Topic</p>
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 text-sm outline-none rounded-md border border-gray-300'
            placeholder='the future of AI is......' required />

            <p className='mt-6 text-sm font-medium ml-2'>Article Length</p>
            <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
                {
                    articleLength.map( (item, idx) => (
                        <span onClick={() => setSelectedLength(item)} key={idx}
                              className={`text-sm px-4 py-1 border rounded-full cursor-pointer 
                              ${selectedLength.text === item.text ? 'bg-blue-50 text-blue-500' : 'text-gray-500' +
                                  ' border-gray-300'} `}>{item.text}</span>
                    ))
                }
            </div>
            <br/>
            <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-br from-[#001BB7] to-[#0C2B4E] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
                <Edit3Icon className='w-5'/>Generate Article
            </button>
        </form>

        {/* right column*/}

        <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-500 min-h-115 max-h-[600px]'>
            <div className='flex items-center gap-6'>
                <Edit3Icon  className='w-5 h-5 text-[#4A7AFF]'/>
                <h1 className='text-xl font-semibold'>Generated Article</h1>
            </div>

            <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
                    <Edit3Icon className='h-9 w-9'/>
                    <p>Enter a topic and click "Generate Article" to get started</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WriteArticle;
