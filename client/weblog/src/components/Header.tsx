import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../Context/UserData'

const Header: React.FC = () => {
  const logcontext = useContext(UserContext)
  console.log(logcontext);
  
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
                {logcontext?.loginstatus.success === false ? <Link to='/register'><button className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Login/SignUp</button></Link> :
                <button onClick={()=>{logcontext?.Logout()}} className='bg-indigo-600 rounded-sm p-1 text-sm text-white hover:shadow-md'>Logout</button>} 
            </ul>
        </div>
    </div>
  )
}

export default Header