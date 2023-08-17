import React from 'react'

const Home: React.FC = () => {
  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='h-[40vh] w-[100vw] flex flex-col justify-center items-center gap-3 p-2'>
         <p className='title text-3xl font-bold text-center'>Latest news, updates, and stories for <span className='text-indigo-600'>developers</span></p>
         <p className='title text-xl font-bold'>to get latest updates</p>
         <button className='bg-indigo-600 shadow-md rounded-sm p-2 text-base font-semibold text-white'>SUBSCRIBE</button>
      </div>
      <div>
       <div className='w-[100vw] flex flex-row justify-around items-center'>
       <span className=' rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span> <h1 className='text-xl font-semibold'>All Articles</h1>  <span className=' rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
       </div>
      </div>
    </div>
  )
}

export default Home