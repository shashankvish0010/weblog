import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AdminReg: React.FC = () => {
    const Navigate = useNavigate()
    interface userdata {
        firstname: String;
        lastname: String;
        email: String;
        admin_password: String;
        confirm_password: String;
        activation_key: String;
    }
    const [user, setUser] = useState<userdata>({
        firstname: '',
        lastname: '',
        email: '',
        admin_password: '',
        confirm_password: '',
        activation_key: ''
    });
    const [status, setStatus] = useState({ message: '' })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { firstname, lastname, email, admin_password, confirm_password, activation_key } = user;
        try {
            const response = await fetch('https://weblog-backend-247o.onrender.com'+'/admin/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, email, admin_password, confirm_password, activation_key })
            });
            if (response) {
                const data = await response.json();
                setStatus(prevStatus => ({
                    ...prevStatus, message: data.message
                }))
                setTimeout(() => { if (data.success === true) { Navigate('/admin/log') } }, 1500)
            } else { console.log("data not sent") }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-[100vh] w-[100vw] flex flex-col gap-2 items-center justify-center mt-2'>
            <span className='p-1 text-center font-semibold shadow-md'><p>{status.message}</p></span>
            <div className='flex flex-col justify-around gap-5 border shadow-md w-max h-max p-4'>
                <div className='text-2xl text-indigo-600 font-semibold mt-1'><h1>Admin Register</h1></div>
                <div>
                    {/* The Admin registration Page  */}
                    <form method='POST' className='flex gap-3 flex-col justify-center'>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Firstname</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='firstname' value={user.firstname.toString()} onChange={handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Lastname</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='lastname' value={user.lastname.toString()} onChange={handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Email</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='email' value={user.email.toString()} onChange={handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Password</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="password" name='admin_password' value={user.admin_password.toString()} onChange={handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Confirm Password</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="password" name='confirm_password' value={user.confirm_password.toString()} onChange={handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <p className='text-sm text-gray-600'>Activation Key</p>
                            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='activation_key' value={user.activation_key.toString()} onChange={handleChange} />
                        </span>
                    </form>
                </div>
                <span className='h-[0.15rem] rounded-md w-[65vw] md:w-[45vw] bg-indigo-600 text-center'></span>
                <div className='flex flex-row flex-wrap justify-around text-base'>
                    <p>Already have an admin account?</p>
                    <p><Link to='/admin/log'>Login</Link></p>
                </div>
                <div className='text-center'>
                    <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default AdminReg