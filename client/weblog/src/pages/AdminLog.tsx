import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AdminContext } from '../Context/AdminData';

const AdminLog: React.FC = () => {
    const Navigate = useNavigate()
    const Admindata = useContext(AdminContext);

    useEffect(()=> {if(Admindata?.status.success){
        Navigate('/panel')
    }}, [Admindata]);

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col gap-2 items-center justify-center'>
    <span className='p-1 text-center font-semibold shadow-md'><p>{Admindata?.status.message}</p></span>
        <div className='flex flex-col justify-around gap-5 border shadow-md w-max h-max p-4'>
            <div className='text-2xl text-indigo-600 font-semibold'><h1>Login</h1></div>
            <div>
                <form method='POST' className='flex gap-3 flex-col justify-center'>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Email</p>
                    <input className='px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded' type="text" name='email' value={Admindata?.admin.email} onChange={Admindata?.handleChange}/>
                    </span>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Password</p>
                    <input className='px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded' type="password" name='admin_password' value={Admindata?.admin.admin_password} onChange={Admindata?.handleChange}/>
                    </span>
                </form>
            </div>
            <span className='h-[0.15rem] rounded-md w-[65vw] md:w-[35vw] bg-indigo-600 text-center'></span>
            <div className='flex flex-row flex-wrap justify-around text-base'>
                <p>Create a new account.</p>
                <p><Link to='/admin/log'>Register</Link></p>
            </div>
            <div className='text-center'>
            <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={Admindata?.AdminLogin}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default AdminLog