import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const Footer: React.FC = () => {
  return (
    <div className='mt-[100%] shadow-md border p-3 flex flex-col justify-evenly items-center h-max w-[100vw]'>
      <div className='flex md:flex-row flex-col gap-3 items-center justify-between w-[100vw] px-8'>
        <h1 className='text-xl font-bold'>We<span className='text-indigo-600'>Blog</span></h1>
        <div className='h-max w-max'>
          <ul className='md:w-[35vw] w-[80vw] text-base font-semibold h-max flex flex-row items-center justify-around'>
            <Link className='hover:text-indigo-600' to='/about'>About</Link>
            <Link className='hover:text-indigo-600' to='/contact'>Contact</Link>
            <Link className='hover:text-indigo-600' to='/admin/reg'>Admin</Link>
          </ul>
        </div>
      </div>
      <div className='w-max h-max flex flex-row items-center mt-5 gap-6'>
        <a href='https://github.com/shashankvish0010'><Icon className='shadow-xl cursor-pointer hover:shadow-2xl' height='4vh' icon="mdi:github" /></a>
        <a href='https://www.linkedin.com/in/shashank-vishwakarma-650555283/'><Icon className='shadow-xl cursor-pointer hover:shadow-2xl' height='4vh' icon="devicon:linkedin" /></a>
        <a href='https://twitter.com/ShashankVis001'><Icon className='shadow-xl cursor-pointer hover:shadow-2xl' height='4vh' icon="line-md:twitter-x-alt" /></a>
      </div>
      <div className='flex flex-wrap w-screen h-max items-center justify-center gap-2 mt-3'>
        <h1 className='text-base font-bold'><Link to='/'>We<span className='text-indigo-600'>Blog</span></Link></h1>
        <p className='flex flex-wrap text-center w-max font-medium'>&copy; Designed and Developed by <span className='text-indigo-600  font-semibold'
        > <a href="https://www.linkedin.com/in/shashank-vishwakarma-650555283/">Shashank Vishwakarma</a></span></p>
      </div>
    </div>
  )
}

export default Footer