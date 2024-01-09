import React, { useContext } from 'react'
import { postContext } from '../Context/PostData';
import { useNavigate } from 'react-router-dom';

interface blogpostbody {
    id: String;
    title: String;
    image: any;
    description: String;
    meta: String;
    firstname: String;
    lastname: String;
}

const PostContainer: React.FC<blogpostbody> = ({ id, title, image, meta, firstname, lastname }) => {
    const blogInfo = useContext(postContext);
    const Navigate = useNavigate();

    const LoadPost = async (Postid: String) => {
        try {
            const response = await fetch('https://weblog-backend-247o.onrender.com'+'/view/post/' + Postid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    blogInfo?.setBlogData(data.blogData)
                }
                else {
                    blogInfo?.setPostStatus((prev: any) => ({
                        ...prev,
                        success: data.success, message: data.message
                    }))
                }
                Navigate('/getview/post/' + Postid)
            }
        } catch (error) {
            console.log(error);
        }
    }
    // const { id, title, image, meta, firstname, lastname } = props;
    return (
        <div className='bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 text-white h-max md:w-[40vw] w-[80vw] shadow-2xl rounded flex flex-col p-3 gap-4 object-fill items-center'>
            <div className='h-[200px]'>
                <img src={image} className='h-[200px] w-[400px] shadow-xl object-cover' />
            </div>
            <span className='rounded-md h-[0.15rem] bg-white w-[100%]'></span>

            <h2 className='title text-xl shadow-sm'>{title}</h2>
            <p className='italic shadow-sm font-medium text-slate-100 text-base'>{meta.length > 150 ? meta.slice(0, 150) : meta}...</p>
            <div className='md:h-[3vh] h-max gap-2 w-[100%] flex md:flex-row flex-col items-center justify-evenly'>
                <p className='meta_desc text-base shadow-sm font-medium'>Posted: {firstname} {lastname}</p>
                <button onClick={() => LoadPost(id)} className='bg-indigo-600 font-medium shadow-md rounded-sm p-1 text-base'>
                    Read More
                </button>
            </div>
        </div>
    )
}

export default PostContainer