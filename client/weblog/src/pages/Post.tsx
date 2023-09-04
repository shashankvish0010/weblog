import React, { useContext, useEffect } from 'react'
import { postContext } from '../Context/PostData';
import { Icon } from '@iconify/react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import Buffering from '../components/Buffering';
import { useParams } from 'react-router-dom';
import Texttag from '../components/Texttag';
import Footer from '../components/Footer';
import PostContainer from '../components/PostContainer';

const Post: React.FC = () => {
    const params = useParams<{ id: string | undefined }>();
    const bloginfo = useContext(postContext);
    const postinfo = useContext(postContext)
    function reverseString(dateString: string | undefined) {
        const [year, month, day] = (dateString ?? '').split('-');

        const reverseString = `${day}-${month}-${year}`;

        return reverseString;
    }
    if (bloginfo?.postStatus?.success === false) {
        useEffect(() => {
            bloginfo?.LoadPost(params.id);
            postinfo?.fetchPosts();
        }, []);
    }

    console.log(bloginfo)
    return (
        <div className='h-max w-[100vw]'>
            {bloginfo?.postStatus?.success === true ?
                (<div className='h-max p-4 flex flex-col items-center gap-10'>
                    <div className='p-3'>
                        <p className='text-3xl font-semibold'> {bloginfo?.blogdata?.blog_title} </p>
                    </div>
                    <div>
                        <img src={bloginfo?.blogdata?.blog_image} height={400} width={800} />
                    </div>
                    <div className='p-3'>
                            <ReactMarkdown children={bloginfo?.blogdata?.blog_description.toString() ?? ''} rehypePlugins={[rehypeRaw]} />                                  
                    </div>

                    <div className='p-3 flex flex-wrap gap-3'>
                        {bloginfo?.blogdata?.blog_keywords.split(',').map((keyword) => (
                            <Texttag keywords={keyword.trim()} />
                        ))}
                    </div>
                    <div className='flex flex-row items-center justify-evenly'>
                        <div><Icon icon="formkit:avatarman" height='5vh' color='blue' /></div>
                        <div className='flex md:flex-row text-base font-semibold flex-col p-2 gap-2'>
                            <p>Posted: {reverseString(bloginfo?.blogdata?.posted?.slice(0, 10))}</p>
                            <p>Written By: {bloginfo?.blogdata?.writer_firstname} {bloginfo?.blogdata?.writer_lastname}</p>
                            <p className='text-indigo-600'>{bloginfo?.blogdata?.writer_email}</p>
                        </div>
                    </div></div>)
                :
                (
                    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
                        <Buffering />
                    </div>
                )

            }
            <div>
                <div className='w-[100vw] flex flex-row justify-around items-center'>
                    <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>{' '}
                    <h1 className='text-xl font-semibold'>Other Posts</h1>{' '}
                    <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
                </div>
            </div>
            <div className='h-max w-[100vw] flex flex-wrap mt-2 p-3 justify-center gap-10'>
                {postinfo?.allposts?.map((post: any) =>
                    <PostContainer
                        id={post.id}
                        title={post.blog_title}
                        image={post.blog_image}
                        meta={post.meta_description}
                        description={post.blog_description}
                        firstname={post.writer_firstname}
                        lastname={post.writer_lastname}
                    />
                )
                }
                <div />

                <Footer />
            </div>
        </div>
    )
}

export default Post