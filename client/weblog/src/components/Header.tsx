import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserData'
import { AdminContext } from '../Context/AdminData'
import { Icon } from '@iconify/react';

const Header: React.FC = () => {
  const usercontext = useContext(UserContext)
  const admincontext = useContext(AdminContext)
  const [mobileDevice, setMobileDevice] = useState<boolean>(false)

  return (
    <div className='h-[8vh] w-[100vw] flex flex-row justify-around items-center shadow-sm'>
      <div>
        <Link to='/'><h1 className='text-2xl font-bold'>We<span className='text-indigo-600'>Blog</span></h1></Link>
      </div>
      <div className='md:w-[30vw] w-max h-max'>
        <ul className='hidden md:flex gap-2 flex-row justify-between items-center font-semibold'>
          <li className='hover:text-indigo-600'><Link to='/'>Home</Link></li>
          <li className='hover:text-indigo-600'><Link to='/about'>About</Link></li>
          <li className='hover:text-indigo-600'><Link to='/contact'>Contact</Link></li>
          <li className='hover:text-indigo-600'><Link to='/write'>Add Post</Link></li>
          {(admincontext?.status.success === false) ? (
            usercontext?.loginstatus.success == false ? (
              <li className='hover:text-indigo-600'>
                <Link to='/register'>
                  <button className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Login/SignUp</button>
                </Link>
              </li>
            ) : (
              <li className='hover:text-indigo-600'>
                <button onClick={ usercontext?.dispatch({ type: "LOGOUT" }) } className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button>
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
        <div className='ml-[90%] md:hidden block'>
          <Icon onClick={() => { setMobileDevice(true) }} icon="charm:menu-hamburger" color="3949AB" height={'4vh'} />
        </div>
      </div>
      {
        mobileDevice === true ?
          <div className='bg-indigo-600 md:hidden text-white font-semibold absolute p-3 mt-[40%]'>
            <ul className='w-[100vw] p-2 flex flex-col gap-2 items-center'>
              <Icon className='mr-[90%]' onClick={() => { setMobileDevice(false) }} icon="material-symbols:arrow-back" height={'3vh'} color="white" />
              <li onClick={() => { setMobileDevice(false) }}><Link to='/'>Home</Link></li>
              <li onClick={() => { setMobileDevice(false) }}><Link to='/about'>About</Link></li>
              <li onClick={() => { setMobileDevice(false) }}><Link to='/contact'>Contact</Link></li>
              <li onClick={() => { setMobileDevice(false) }}><Link to='/write'>Add Post</Link></li>

              {
                usercontext?.loginstatus.success === true ?
                  <li className='hidden' onClick={() => { setMobileDevice(false) }}><Link to='/register'>Login/SignUp</Link></li>
                  :
                  <li onClick={() => { setMobileDevice(false) }}><Link to='/register'>Login/SignUp</Link></li>
              }  </ul>
          </div>
          :
          null
      }
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
    </div>
  )
}

export default Header