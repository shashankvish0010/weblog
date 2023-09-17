import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserData'
import { useNavigate } from 'react-router-dom';
import { postContext } from '../Context/PostData';
import { Icon } from '@iconify/react'
import PostContainer from '../components/PostContainer';
import Buffering from '../components/Buffering';
import Footer from '../components/Footer';

interface PostInt {
  id: String;
  blog_id: '',
  blog_title: '',
  blog_image: '',
  meta_description: '',
  blog_description: '',
  writer_firstname: '',
  writer_lastname: '',
  public_view: '',
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const postinfo = useContext(postContext)
  const usercontext = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState<String>('')
  const [resultData, setResultData] = useState<PostInt[] | undefined>()

  const hanldeSearch = async () => {
    try {
      const response = await fetch( 'https://weblog-backend-247o.onrender.com'+'/search/post/' + searchQuery, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response) {
        const data = await response.json();
        console.log(data);

        setResultData(data.filteredPosts)
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    postinfo?.fetchPosts();
  }, []);

  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='h-max w-[100vw] flex flex-col justify-evenly mt-3 mb-3 items-center gap-5 p-4'>
        <p className='title text-3xl font-bold text-center'>Latest news, updates, and stories for <span className='text-indigo-600'>developers</span></p>
        <div className='h-max w-max rounded-full p-1.5 text-base border-2 border-indigo-600 flex flex-row items-center'>
          <input className='md:w-[30vw] w-[70vw] placeholder:text-black placeholder:font-semibold' type="text" placeholder='Search' value={searchQuery.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
          <Icon onClick={hanldeSearch} className='md:hidden cursor-pointer' icon="majesticons:search-line" color='#3949ab' />
        </div>
        {usercontext?.user?.subscription === true ? (
          <p className='title text-xl font-bold'>Thanks for subscribing.</p>
        ) : (
          <p className='title text-xl font-bold'>To get latest updates</p>
        )}
        {usercontext?.loginstatus.success === true && usercontext?.user ? (
          usercontext.user.subscription === false ? (
            <button
              onClick={() => { usercontext.dispatch({ type: "SUBSCRIBE", id: usercontext.user.id }) }}
              className='bg-indigo-600 shadow-md rounded-sm p-2 text-base font-semibold text-white'
            >
              SUBSCRIBE
            </button>
          ) : (
            <button
              onClick={() => { usercontext.dispatch({ type: "UNSUBSCRIBE", id: usercontext.user.id }) }}
              className='bg-indigo-600 shadow-md rounded-sm p-2 text-base font-semibold text-white'
            >
              UNSUBSCRIBE
            </button>
          )
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-indigo-600 shadow-md rounded-sm p-2 text-base font-semibold text-white'
          >
            Get Started for free
          </button>
        )}
      </div>
      <div>
        <div className='w-[100vw] flex flex-row justify-around items-center'>
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
          <h1 className='text-xl font-semibold'>All Articles</h1>
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
        </div>
      </div>
      <div className='h-[100vh] w-[100vw] flex flex-wrap justify-center mt-2 p-3 gap-10'>
        {resultData ? (resultData.length > 0 ?
          (resultData?.map((post) =>
            <PostContainer
              id={post.id}
              title={post.blog_title}
              image={post.blog_image}
              meta={post.meta_description}
              description={post.blog_description}
              firstname={post.writer_firstname}
              lastname={post.writer_lastname}
              />
          )) : null)
          :
          null
        }
        {postinfo?.allposts?.length ? ((postinfo.allposts.length > 0) ?
          (postinfo?.allposts.map((post: any) =>
          (<PostContainer
            id={post.id}
            title={post.blog_title}
            image={post.blog_image}
            meta={post.meta_description}
            description={post.blog_description}
            firstname={post.writer_firstname}
            lastname={post.writer_lastname} />
          )))
          :
          (
            <div className='h-max w-[100vw] p-3 flex items-center justify-center'>
              <Buffering />
            </div>
          ))
          :
          (
            <div className='h-max w-[100vw] p-3 flex items-center justify-center'>
              <Buffering />
            </div>
          )
        }
        <Footer />
      </div>
    </div>
  );
};

export default Home;