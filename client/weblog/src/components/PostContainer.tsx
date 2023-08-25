import React, {useContext} from 'react'
import { postContext } from '../Context/PostData';

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
  return (
    <div className='h-max w-max flex flex-col p-3 gap-4 items-center'>
        <div>
            <img src={image} height={400} width={800}/>
        </div>
        <div>
            <h2>{title}</h2>
        </div>
        <div>
            <p>{description}</p>
        </div>
        <div>
            <div>
                <p>{firstname} {lastname}</p>
            </div>
            <div>
            <button onClick={()=>blogInfo?.LoadPost(id)} className='bg-indigo-600 shadow-md rounded-sm p-2 text-base font-semibold text-white'>
              Read More
            </button>     
        </div>
    </div>
    </div>
  )
}

export default PostContainer