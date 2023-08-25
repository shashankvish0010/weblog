import React, { useContext } from 'react'
import { postContext } from '../Context/PostData';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface blogpostbody {
    id: String;
    title: String;
    image: String;
    description: String;
    meta: String;
    tags: String;
    firstname: String;
    lastname: String;
    email: String
}

const PostContainer: React.FC<blogpostbody> = (props) => {
    const blogInfo = useContext(postContext);
    const { id, title, image, description, meta, firstname, lastname } = props;
    return (
        <div className='h-max md:w-[40vw] w-[80vw] shadow-2xl rounded flex flex-col p-3 gap-4 object-fill items-center'>
            <div className='h-[200px]'>
                <img src={image} className='h-[200px] w-[400px] object-cover' />
            </div>
            <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[100%]'></span>

            <h2 className=' font-medium text-xl'>{title}</h2>
            <p>{meta.length > 150 ? meta.slice(0, 150) : meta}...</p>
            <div className='md:h-[3vh] h-max gap-2 w-[100%] flex md:flex-row flex-col items-center justify-evenly'>
                <p className='text-base font-medium'>Posted: {firstname} <span className='text-indigo-600'>{lastname}</span></p>
                <button onClick={() => blogInfo?.LoadPost(id)} className='bg-indigo-600 font-medium shadow-md rounded-sm px-1 text-base text-white'>
                    Read More
                </button>
            </div>
        </div>
    )
}

export default PostContainer