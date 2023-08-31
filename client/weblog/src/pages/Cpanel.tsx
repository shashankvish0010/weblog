import React, {useContext} from 'react'
import ProfilePost from '../components/ProfilePost'
import { postContext } from '../Context/PostData'

const Cpanel: React.FC = () => {
    const postDetalis = useContext(postContext)
    console.log(postDetalis?.allposts);
    return (
        <div className='h-max w-[100vw] flex flex-col justify-center gap-5 p-3'>
            <div>

            </div>
            <div className='w-[100vw] flex flex-row justify-around items-center'>
                <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
                <p className='text-xl font-semibold'>All Live Posts</p>
                <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
            </div>
            <div className='flex flex-col justify-center gap-5'>
                { postDetalis?.allposts?.map((post)=>                
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
    )
}

export default Cpanel