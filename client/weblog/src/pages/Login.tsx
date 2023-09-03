import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserData';

const Login: React.FC = () => {
    const Navigate = useNavigate()
    const usercontext = useContext(UserContext)
    interface userCredentials {
        email: String;
        user_password: String;
    }
    const [user, setUser] = useState<userCredentials>({
        email: '',
        user_password: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }
    useEffect(() => {
        if (usercontext?.loginstatus.success === true) {
            Navigate('/')
        }
    }, [usercontext]);

    return (
        <div className='h-[100vh] w-[100vw] flex flex-col gap-2 items-center justify-center'>
            <span className='p-1 text-center font-semibold shadow-md'><p>{usercontext?.loginstatus.message}</p></span>
            <div className='flex flex-col justify-around gap-5 border shadow-md w-max h-max p-4'>
                <div className='text-2xl text-indigo-600 font-semibold'><h1>Login</h1></div>
                <div>
                    <form method='POST' className='flex gap-3 flex-col justify-center'>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Email</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded' type="text" name='email' value={user.email} onChange={handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Password</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded' type="password" name='user_password' value={user.user_password} onChange={handleChange} />
                        </span>
                    </form>
                </div>
                <span className='h-[0.15rem] rounded-md w-[65vw] md:w-[35vw] bg-indigo-600 text-center'></span>
                <div className='flex flex-row flex-wrap justify-around text-base'>
                    <p>Create a new account.</p>
                    <p><Link to='/register'>Register</Link></p>
                </div>
                <div className='text-center'>
                    <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={() => { usercontext?.dispatch({ type: "LOGIN", data: user }) }}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login