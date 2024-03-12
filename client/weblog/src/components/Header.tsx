import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserData'
import { AdminContext } from '../Context/AdminData'
import { Icon } from '@iconify/react';

const Header: React.FC = () => {
  const usercontext = useContext(UserContext)
  const admincontext = useContext(AdminContext)
  const [mobileDevice, setmobileDevice] = useState<boolean>(false)

  return (
    <>
      <div className='bg-white h-[8vh] w-[100vw] flex flex-row justify-around items-center shadow-sm'>
        <div className='h-max'>
          <Link to='/'>
            <span className='h-max flex items-center gap-2'>
              <Icon icon="material-symbols:developer-mode-tv-outline" color='3949AB' height='4vh' />
              <h1 className='logo md:text-2xl text-xl text-black font-bold'>We<span className='text-indigo-600'>Blog</span></h1>
            </span>
          </Link>
        </div>
        <div className='w-[40vw] h-max'>
          <ul className='hidden md:flex w-[100%] flex-row justify-evenly items-center font-semibold'>
            <li className='hover:text-indigo-600'><Link to='/'>Home</Link></li>
            <li className='hover:text-indigo-600'><Link to='/about'>About</Link></li>
            <li className='hover:text-indigo-600'><Link to='/contact'>Contact</Link></li>
            <li className='hover:text-indigo-600'><Link to='/write'><span className='text-center'>Add Post</span></Link></li>
            {(admincontext?.status.success === false) ? (
              usercontext?.loginstatus.success == false ? (
                <li className='hover:text-indigo-600'>
                  <Link to='/register'>
                    <button className='bg-indigo-600 rounded-sm p-2 text-sm text-white hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y+1 hover:scale-105'>Login/SignUp</button>
                  </Link>
                </li>
              ) : (
                <li className='hover:text-indigo-600'>
                  <button onClick={() => { usercontext?.dispatch({ type: "LOGOUT" }) }} className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button>
                </li>
              )
            ) : (
              admincontext?.status.success === true ? (
                <li className='hover:text-indigo-600'>
                  <button onClick={() => { admincontext?.dispatch({ type: "ADMINLOGOUT" }) }} className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button>
                </li>
              ) : (
                null
              )
            )}
            {usercontext?.loginstatus.success === true ? (
              <li className='hover:text-indigo-600'>
                <Link to='/profile'>
                  <Icon icon='gg:profile' height='4vh' />
                </Link>
              </li>
            ) : (
              null
            )}
          </ul>
        </div>
        {usercontext?.loginstatus.success === true ? (
          <li className='md:hidden hover:text-indigo-600 flex gap-2'>
            <Link to='/profile'>
              <Icon icon='gg:profile' height='3vh' color='3949AB' />
            </Link>
            <Link to='/'>
              <Icon onClick={() => { usercontext?.dispatch({ type: "LOGOUT" }) }} icon='tabler:logout' height='3vh' color='3949AB' />
            </Link>
          </li>
        ) : (
          <li className='hover:text-indigo-600 hidden'>
            <Link to='/profile'>
              <Icon icon='iconamoon:profile-circle-fill' />
            </Link>
          </li>
        )}
        {
          mobileDevice == true ?
            <div
              onClick={() => setmobileDevice(!mobileDevice)} className='md:hidden block h-max w-max'>
              <Icon icon="oui:cross" height={'2rem'} color='indigo' />
            </div>
            :
            <div
              onClick={() => setmobileDevice(!mobileDevice)} className='md:hidden block h-max w-max'>
              <Icon icon="quill:hamburger" height={'2rem'} color='indigo' />
            </div>
        }

      </div>
      {
        mobileDevice == true ?
          <div
            className='absolute md:hidden block h-max w-screen bg-indigo-600 items-center p-3'>
            <ul className='h-[25vh] text-white uppercase header_list md:hidden flex flex-col justify-around text-sm'>
              <Link onClick={() => { setmobileDevice(false) }} to='/'>Home</Link>
              <Link onClick={() => { setmobileDevice(false) }} to='/about'>About</Link>
              <Link onClick={() => { setmobileDevice(false) }} to='/contact'>Contact</Link>
              <Link onClick={() => { setmobileDevice(false) }} to='/write'>Add Post</Link>
              {
                usercontext?.loginstatus.success === true ?
                  <li className='hidden' onClick={() => { setmobileDevice(false) }}><Link to='/register'>Login/SignUp</Link></li>
                  :
                  <li onClick={() => { setmobileDevice(false) }}><Link to='/register'>Login/SignUp</Link></li>
              } 
          </ul>
          </div >
          : null
      }
    </>
  )
}

export default Header