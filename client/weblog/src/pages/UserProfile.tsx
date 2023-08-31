import React, { useState, useContext, useEffect } from 'react'
import { Icon } from '@iconify/react';
import { UserContext } from '../Context/UserData';
import ProfilePost from '../components/ProfilePost';

interface blogpostbody {
  id: String;
  blog_title: String;
  blog_image: String;
  blog_description: String;
  blog_keywords: String;
  public_view: String;
  meta_description: String;
  writer_firstname: String;
  writer_lastname: String;
  writer_email: String;
}

const UserProfile: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const [userPosts, setUserPosts] = useState<blogpostbody[]>()
  const enableEdit = () => setEdit(true)
  const userdata = useContext(UserContext)

  const [editProfile, setEditProfile] = useState({
    id: userdata?.user.id,
    firstname: userdata?.user.firstname,
    lastname: userdata?.user.lastname,
    email: userdata?.user.email,
    user_password: userdata?.user.user_password
  })

  const fetchPostsData = async (email: String) => {
    try {
      const response = await fetch('/fetch/user/posts/' + email, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response) {
        const data = await response.json()
        if(data.success){
          setUserPosts((data.userPostsData))
        }
      } else {
        console.log("Cant recieve user posts");
      }
    } catch (error) {
      console.log(error);
    }            
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value
    }))
  }
  const handleSubmit = async () => {
    const { id, firstname, lastname, email } = editProfile;
    try {
      const response = await fetch('/edit/profile', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id, firstname, lastname, email
        })
      });
      if (response) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Cannot edit profile");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {fetchPostsData(userdata?.user.email)}, [])

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col gap-5 items-center'>
      <div>
        <div>
          {/* <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={handleSubmit}>Set Profile Photo</button>
       <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={handleSubmit}>Delete Photo</button> */}
        </div>
      </div>
      {edit === false ? (
        <>
          <div className='h-max w-[100vw] flex flex-col gap-5'>
            <div className='h-max w-[100vw] flex md:flex-row flex-col gap-3 items-center justify-center'>
            <Icon icon="gg:profile" color="#3949ab" height={'10vh'} />
            <p className='md:text-2xl text-xl font-medium'>{userdata?.user.firstname} <span className='text-indigo-600'>{userdata?.user.lastname}</span></p>          </div>
            </div>
          <div className='flex md:flex-row flex-col items-center justify-around gap-5 '>
          <span className='flex flex-row flex-wrap items-center gap-2'>
            <Icon icon="mdi:email-check" color="orange" height={'5vh'} />
            <p className='text-base font-medium'>{userdata?.user.email}</p>
          </span>
          <span className='flex md:w-max w-[80vw] md:flex-row overflow-auto flex-col items-center gap-2'>
            <Icon icon="iconoir:password-pass" color="#3949ab" height={'5vh'} />
            <span className='overflow-auto'>
            <p className='text-base font-medium overflow-auto'>{userdata?.user.user_password}</p>
            </span>
          </span>
          </div>
          <div className='flex flex-col gap-5'>
            { userdata ?  (userPosts?.map((post) =>
              <ProfilePost
                id={post.id}
                title={post.blog_title}
                meta={post.meta_description}
                image={post.blog_image}
                publicView={post.public_view}
                admin = {false}
              />
            ))
            :
            (
              <div>
                <p>No user post</p>
              </div>
            )}
          </div>
        </>) :

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
              <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='email' value={editProfile?.email} onChange={handleChange} />
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