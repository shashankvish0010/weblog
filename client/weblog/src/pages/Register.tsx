import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RegisterContext } from '../Context/UserReg';
const Register: React.FC = () => {
    const userreginfo = useContext(RegisterContext)
    const Navigate = useNavigate()

    useEffect(() => {
        if (userreginfo?.status.success === true ) {
            Navigate('/verify')
        }
    }, [userreginfo])

    return (
        <div className='relative h-[100vh] w-[100vw] flex flex-col gap-2 items-center justify-center'>
            <span className='p-1 text-center font-semibold shadow-md'><p>{userreginfo?.status.message}</p></span>
            <div className='flex flex-col justify-around gap-5 border shadow-md w-max h-max p-4'>
                <div className='text-2xl text-indigo-600 font-semibold'><h1>Register</h1></div>
                <div>
                    <form method='POST' className='flex gap-3 flex-col justify-center'>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Firstname</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='firstname' value={userreginfo?.user.firstname} onChange={userreginfo?.handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Lastname</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='lastname' value={userreginfo?.user.lastname} onChange={userreginfo?.handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Email</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='email' value={userreginfo?.user.email} onChange={userreginfo?.handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Password</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="password" name='user_password' value={userreginfo?.user.user_password} onChange={userreginfo?.handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Confirm Password</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="password" name='confirm_password' value={userreginfo?.user.confirm_password} onChange={userreginfo?.handleChange} />
                        </span>
                    </form>
                </div>
                <span className='h-[0.15rem] rounded-md w-[65vw] md:w-[45vw] bg-indigo-600 text-center'></span>
                <div className='flex flex-row flex-wrap justify-around text-base'>
                    <p>Already have an account?</p>
                    <p><Link to='/login'>Login</Link></p>
                </div>
                <div className='text-center'>
                    <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={userreginfo?.handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Register