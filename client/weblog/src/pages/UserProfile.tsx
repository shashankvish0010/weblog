import React, {useState} from 'react'
import { Icon } from '@iconify/react';

const UserProfile: React.FC = () => {
    const [edit, setEdit] = useState<boolean>(false)
    const enableEdit = () => setEdit(true)

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col gap-5 items-center'>
       <div>
       <Icon icon="entypo:user" />
       <div>
       <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={handleSubmit}>Set Profile Photo</button>
       <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={handleSubmit}>Delete Photo</button>
       </div>
       </div>
       { edit ? (
         <div>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Firstname</p>
                    <span className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' value={user.firstname}/>
                    </span>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Lastname</p>
                    <span className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded'  value={user.lastname}/>
                    </span>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Email</p>
                    <span className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' value={user.email}/>
                    </span>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Password</p>
                    <span className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' value={user.user_password}/>
                    </span>
       </div>) : 

       (<div>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Firstname</p>
                    <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='firstname' value={user.firstname} onChange={handleChange}/>
                    </span>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Lastname</p>
                    <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='lastname' value={user.lastname} onChange={handleChange}/>
                    </span>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Email</p>
                    <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='email' value={user.email} onChange={handleChange}/>
                    </span>
                    <span className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-600'>Password</p>
                    <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="password" name='user_password' value={user.user_password} onChange={handleChange}/>
                    </span>
       </div>)
}
<button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={enableEdit}>Edit Profile</button>
    </div>
  )
}

export default UserProfile