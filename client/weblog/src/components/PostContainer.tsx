import React, {useContext} from 'react'
import { postContext } from '../Context/PostData';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface blogpostbody {
    id: String;
    title: String;
    image: String;
    description: String;
    tags: String;
    firstname: String;
    lastname: String;
    email: String
    }

const PostContainer: React.FC<blogpostbody> = (props) => {
    const blogInfo = useContext(postContext);
        const { id, title, image, description, firstname, lastname } = props;
        console.log(id, title, image, description, firstname, lastname);
        
  return (
    <div className='h-max md:w-[40vw] w-[80vw] shadow-2xl rounded flex flex-col p-3 gap-4 items-center'>
        <div className='h-max w-max rounded'>
            <img src={image} height={200} width={300}/>
        </div>
        <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[100%]'></span>

            <h2 className='md:text-2xl font-medium text-xl'>{title}</h2>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{description.slice(0,100)}</ReactMarkdown>
        <div className='h-[3vh] w-max flex flex-row items-center justify-evenly gap-5'>
                <p>{firstname} {lastname}</p>
            
            <button onClick={()=>blogInfo?.LoadPost(id)} className='bg-indigo-600 shadow-md rounded-sm p-1 text-base font-semibold text-white'>
              Read More
            </button>     
        </div>
    </div>
  )
}

export default PostContainer