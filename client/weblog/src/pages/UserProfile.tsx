import React, { useState, useContext } from 'react'
import { Icon } from '@iconify/react';
import { UserContext } from '../Context/UserData';

const UserProfile: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const enableEdit = () => setEdit(true)
  const userdata = useContext(UserContext)
  const [editProfile, setEditProfile] = useState({
    id : userdata?.user.id,
    firstname : userdata?.user.firstname,
    lastname : userdata?.user.lastname,
    email : userdata?.user.email,
    user_password : userdata?.user.user_password
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setEditProfile((currentProfile) => ({
        ...currentProfile,
        [name] : value
      }))
  }
  const handleSubmit = async () => {
        const {id, firstname , lastname , email } = editProfile;
   try {
    const response = await fetch('/edit/profile', {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
         id, firstname , lastname , email 
      })
    });
    if(response){
      const data = await response.json();
      console.log(data);
    }else {
      console.log("Cannot edit profile");         
    }
   } catch (error) {
    console.log(error);
   }
  }
  
  return (
    <div className='h-[100vh] w-[100vw] flex flex-col gap-5 items-center'>
      <div>
        <Icon icon="entypo:user" />
        <div>
          {/* <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={handleSubmit}>Set Profile Photo</button>
       <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={handleSubmit}>Delete Photo</button> */}
        </div>
      </div>
      {edit === false ? (
        <div>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-gray-600'>Firstname</p>
            <span className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded'>{userdata?.user.firstname}</span>
          </span>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-gray-600'>Lastname</p>
            <span className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded'>{userdata?.user.lastname}</span>
          </span>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-gray-600'>Email</p>
            <span className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded'>{userdata?.user.email}</span>
          </span>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-gray-600'>Password</p>
            <span className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded'>{userdata?.user.user_password}</span>
          </span>
        </div>) :

        (<div>
          <form method="PUT">
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-gray-600'>Firstname</p>
            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='firstname' value={editProfile?.firstname} onChange={handleChange} />
          </span>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-gray-600'>Lastname</p>
            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='lastname' value={editProfile?.lastname} onChange={handleChange} />
          </span>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-gray-600'>Email</p>
            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='email'  value={editProfile?.email} onChange={handleChange} />
          </span>
          </form>
        </div>)
      }
      <div className='text-center'>
         <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={enableEdit}>Edit Profile</button>        
      </div>
      <div className='text-center'>
      <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default UserProfile