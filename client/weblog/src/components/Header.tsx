import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../Context/UserData'
import { AdminContext } from '../Context/AdminData'
import { Icon } from '@iconify/react';

const Header: React.FC = () => {
  const logcontext = useContext(UserContext)  
  const admincontext = useContext(AdminContext)
  const handleUserLogout = () => {logcontext?.Logout()} ;
  const handleAdminLogout = () => {admincontext?.AdminLogout()} ;
  return (
    <div className='h-[8vh] w-[100vw] flex flex-row justify-around items-center shadow-sm'>
        <div>
            <h1 className='text-2xl font-bold'>We<span className='text-indigo-600'>Blog</span></h1>
        </div>
        <div className='w-[30vw] h-max'>
            <ul className='hidden md:flex flex-row justify-between items-center font-semibold'>
                <li className='hover:text-indigo-600'><Link to='/'>Home</Link></li>
                <li className='hover:text-indigo-600'><Link to='/about'>About</Link></li>
                <li className='hover:text-indigo-600'><Link to='/contact'>Contact</Link></li>
                {/* {logcontext?.loginstatus.success ? <li className='hover:text-indigo-600'><Link to='/profile'><Icon icon="gg:profile" height='4vh' /></Link></li> 
                : <li className='hover:text-indigo-600 hidden'><Link to='/profile'><Icon icon="iconamoon:profile-circle-fill" /></Link></li>}
                {(admincontext?.status.success === false) ?
                
                (logcontext?.loginstatus.success === false ? <Link to='/register'><button className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Login/SignUp</button></Link> :
                <button onClick={handleUserLogout} className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button>)
                
              :
                (admincontext?.status.success ? <button onClick={handleAdminLogout} className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button> :
                 <button onClick={handleAdminLogout} className='bg-indigo-600 hidden rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button>)
                } */}
            {logcontext?.loginstatus.success ? (
            <li className='hover:text-indigo-600'>
              <Link to='/profile'>
                <Icon icon='gg:profile' height='4vh' />
              </Link>
            </li>
          ) : (
            <li className='hover:text-indigo-600 hidden'>
              <Link to='/profile'>
                <Icon icon='iconamoon:profile-circle-fill' />
              </Link>
            </li>
          )}
          {(admincontext?.status.success === false) ? (
            logcontext?.loginstatus.success === false ? (
              <li className='hover:text-indigo-600'>
                <Link to='/register'>
                  <button className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Login/SignUp</button>
                </Link>
              </li>
            ) : (
              <li className='hover:text-indigo-600'>
                <button onClick={handleUserLogout} className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button>
              </li>
            )
          ) : (
            admincontext?.status.success ? (
              <li className='hover:text-indigo-600'>
                <button onClick={handleAdminLogout} className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button>
              </li>
            ) : (
              <li className='hover:text-indigo-600 hidden'>
                <button onClick={handleAdminLogout} className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button>
              </li>
            )
          )}
            </ul>
        </div>
    </div>
  )
}

export default Header