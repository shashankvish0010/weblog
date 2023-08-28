import React, { useContext } from 'react'
import {Icon} from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { postContext } from '../Context/PostData'

const ProfilePost: React.FC = (props) => {
    const { id, image, title, meta, publicView, admin} = props;
    const Navigate = useNavigate();
    const post = useContext(postContext)
    const EditPost = (blogId: String) => Navigate('/edit/post'+blogId)

    const LoadPost = async (Postid: String) => {        
        try {
            const response = await fetch('/view/post/'+Postid, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            if(response){
                const data = await response.json();
                console.log(data);
    
                if(data.success){                
                post?.setBlogData(data.blogData)
                }
                else{
                    post?.setPostStatus((prev: any)=>({
                        ...prev,
                        success : data.success, message : data.message
                    }))
                }
                Navigate('/getview/post/'+Postid)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='h-max w-[100vw] flex justify-center'>
            <div className='border-2 p-3 rounded border-indigo-600 h-max w-[80vw] flex md:flex-row flex-col gap-5 items-center justify-center'>
            <div className='relative md:w-[20vw] w-[65vw] h-max'>
            <span className='absolute'>{publicView === true ? <p className='bg-green-500 p-0.5 text-white w-max text-sm font-light'>Public</p> : <p className='bg-red-600 p-0.5 text-white w-max text-sm font-light'>Private</p> }</span>
                <img src={image} height={50}/>
            </div>
            <span className='rounded-md md:h-[100px] h-[0.15rem] bg-indigo-600 w-[100%] md:w-[0.15rem]'></span>
            <div className='flex flex-col h-max w-[60vw] gap-3'>
                <h2 className='font-medium text-xl'>{title}</h2>
                <p>{meta.length > 150 ? meta.slice(0, 150) : meta}...</p>
            </div>
            <div className='flex md:flex-col flex-row flex-wrap justify-center items-center gap-5'>
            <button onClick={() => LoadPost(id)} className='bg-indigo-600 md:w-[8vw] w-[25vw] flex items-center justify-center gap-1 font-medium shadow-md rounded-sm px-1 text-base text-white'>
                    <Icon icon="iconamoon:edit-light" color='white' /> Read
                </button>
                { admin === true ? 
                (<button onClick={() => post?.FlagPost(id)} className='bg-orange-600 md:w-[8vw] w-[25vw] flex items-center justify-center gap-1 font-medium shadow-md rounded-sm px-1 text-base text-white'>
                    <Icon icon="prime:flag" color="white" /> Flag
                </button>)
                :
                 (<button onClick={() => EditPost(id)} className='bg-green-500 md:w-[8vw] w-[25vw] flex items-center justify-center gap-1 font-medium shadow-md rounded-sm px-1 text-base text-white'>
                    <Icon icon="iconamoon:edit-light" color='white' /> Edit
                </button>)}
                <button onClick={() => post?.DeletePost(id)} className='bg-red-600 md:w-[8vw] w-[25vw] flex items-center justify-center gap-1 font-medium shadow-md rounded-sm px-1 text-base text-white'>
                    <Icon icon="material-symbols:delete-outline" color="white" /> Delete
                </button>
            </div>
            </div>
        </div>
    )
}

export default ProfilePost