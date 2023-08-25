import React, {useContext} from 'react'
import { postContext } from '../Context/PostData';
import { Icon } from '@iconify/react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';

const Post: React.FC = () => {

    const bloginfo = useContext(postContext)
    return (
        <div className='h-[100vh] w-[100vw] flex flex-col items-center p-3 gap-6'>
            <div className='text-3xl font-semibold'>
                {bloginfo?.blogdata?.title}
            </div>
            <div>
                <img src={bloginfo?.blogdata?.image} height={400} width={800} />
            </div>
            <div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{bloginfo?.blogdata?.description}</ReactMarkdown>
            </div>
            <div>
                {bloginfo?.blogdata?.tags}
            </div>
            <div className='flex flex-row items-center justify-evenly'>
                <div><Icon icon="formkit:avatarman" height='5vh' color='indigo' /></div>
                <div className='flex md:flex-row flex-col p-2 gap-2'>
                    <p>{bloginfo?.blogdata?.firstname} {bloginfo?.blogdata?.lastname}</p>
                    <p>{bloginfo?.blogdata?.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Post