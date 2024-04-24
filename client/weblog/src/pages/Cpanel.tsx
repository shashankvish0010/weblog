import React, { useContext, useEffect } from 'react'
import ProfilePost from '../components/ProfilePost'
import { postContext } from '../Context/PostData'
import { Icon } from '@iconify/react'
import { AdminContext } from '../Context/AdminData'
import { Link } from 'react-router-dom'

const Cpanel: React.FC = () => {
    const postDetalis = useContext(postContext)
    const adminInfo = useContext(AdminContext)
    useEffect(()=> console.log(adminInfo)
    , [adminInfo])
    return (
        (adminInfo?.status.success == true) ?
            <div className='h-max w-[100vw] flex flex-col justify-center gap-5 p-3'>
                <div className='h-max w-screen flex flex-row justify-around'>
                    <Link to='/sendmail'>
                        <span className='bg-green-400 rounded cursor-pointer text-white shadow p-3 flex items-center gap-2 font-semibold'>
                            <Icon icon="mdi:email-send" color='white' height={'7vh'} />
                            <p>Send Updates</p>
                        </span>
                    </Link>
                </div>
                <div className='w-[100vw] flex flex-row justify-around items-center'>
                    <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
                    <p className='text-xl font-semibold'>All Live Posts</p>
                    <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
                </div>
                <div className='flex flex-col justify-center gap-5'>
                    {postDetalis?.allposts?.map((post) =>
                        <ProfilePost
                            id={post.id}
                            title={post.blog_title}
                            meta={post.meta_description}
                            image={post.blog_image}
                            publicView={post.public_view}
                            admin={true}
                        />
                    )
                    }
                </div>
            </div>
            :
            <div className='h-screen w-[100vw] flex justify-center items-center'>
                <span className='bg-indigo-600 flex flex-col items-center gap-3 p-4 rounded shadow'>
                    <Icon icon="teenyicons:calendar-no-access-solid" color="white" height={'5vh'} />
                    <p className='h-max w-max text-white text-base font-semibold'>Unauthorized Access</p>
                </span>
            </div>)
}


export default Cpanel