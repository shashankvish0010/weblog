import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Context/UserData'
import { useNavigate } from 'react-router-dom';
import { postContext } from '../Context/PostData';
import { Icon } from '@iconify/react'
import PostContainer from '../components/PostContainer';
import Buffering from '../components/Buffering';
import Footer from '../components/Footer';
import bannerImage from '../images/banner-weblog-1.png'

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

interface fetch {
  success: Boolean,
  content: String,
  message: String
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const postinfo = useContext(postContext)
  const usercontext = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState<String>('')
  const [resultData, setResultData] = useState<PostInt[] | undefined>()
  const [searchAiQuery, setSearchAiQuery] = useState<String>('')
  const [resultAiData, setResultAiData] = useState<fetch | undefined>()

  // https://weblog-backend-247o.onrender.com
  const hanldeSearch = async () => {
    try {
      const response = await fetch('https://localhost:8080' + '/search/post/' + searchQuery, {
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

  const fetchAi = async () => {
    try {
      const response = await fetch('/fetch/openai', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: searchAiQuery
        })
      })
      if (response) {
        const data = await response.json();
        console.log(data);
        setResultAiData(data.content)
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
      <div className='relative h-max w-screen flex flex-col justify-evenly mb-3 items-center gap-5'>
        <div className='h-max bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 flex flex-col'>
          <div className='h-max flex md:flex-row flex-col items-center md:justify-evenly justify-center'>
            <div className='h-max md:w-[45%] w-[90vw] flex flex-col md:gap-8 gap-4 p-3'>
              <h2 className='md:text-5xl text-3xl font-bold text-slate-100 shadow-sm'>Your coding odyssey begins.</h2>
              <p className='text-slate-200 font-semibold text-sm'>Elevate your code, empower your creativity, and connect with a community of developers on the ultimate blogging platform for tech enthusiasts</p>
              <span className='flex flex-row items-center gap-4'>
                <button
                  onClick={() => navigate('/register')}
                  className='bg-gradient-to-r from-pink-500 to-purple-500 md:w-[10dvw] w-max shadow-md rounded-sm p-2 text-base font-normal text-white'>
                  Join WeBlog
                </button>
                <span className='h-max flex flex-row items-center'>
                  <Icon icon="material-symbols:more-up" color="white" rotate={1} hFlip={true} height={'6vh'} />
                  <span className='text-base font-semibold text-white'>Learn More</span>
                </span>
              </span>
            </div>
            <div className='h-max md:w-max w-[85vw] flex items-center justify-center p-2'>
              <img width={'500px'} src={bannerImage} />
            </div>
          </div>
          <div className='h-max w-[100%]  flex flex-col justify-evenly mb-3 items-center gap-5'>
            {usercontext?.user?.subscription === true ? (
              <p className='title text-white text-xl font-bold'>Thanks for subscribing.</p>
            ) : (
              <h2 className='md:text-3xl text-xl text-white font-bold'>Subscribe Our Newsletter</h2>
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
                className='bg-gradient-to-r from-pink-500 to-purple-500 shadow-md rounded-sm p-2 text-base font-semibold text-slate-100'
              >
                Get Started for free
              </button>
            )}
            <div className='bg-slate-100 h-max w-max rounded-full p-1.5 text-base flex flex-row items-center'>
              <input className='md:w-[30vw] w-[70vw] bg-slate-100 placeholder:text-black placeholder:font-semibold' type="text" placeholder='Search' value={searchQuery.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
              <Icon onClick={hanldeSearch} className='cursor-pointer' icon="majesticons:search-line" color='#3949ab' />
            </div>
          </div>
        </div>
      </div>
      <div className='h-max w-screen flex items-center justify-center'>
        <div className='bg-white border-gray-200 border-2 md:h-[30vh] h-[20vh] md:w-[50vw] w-[85vw] justify-evenly flex flex-col items-center p-3 rounded-lg shadow-2xl'>
          <h2 className='title md:text-xl'>Get New Ideas to <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text'>Share With Ai</span></h2>
          <div className='bg-slate-100 h-max w-max rounded-full p-1.5 text-base flex flex-row items-center'>
            <input className='md:w-[30vw] w-[70vw] px-1 bg-slate-100 placeholder:text-black placeholder:font-semibold' type="text" placeholder='Try it now..' value={searchAiQuery.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchAiQuery(e.target.value)} />
            <Icon onClick={fetchAi} className='cursor-pointer' icon="majesticons:search-line" color='#3949ab' />
          </div>
        </div>
      </div>
      <div>
        {resultAiData?.success == true ? 
        <div className='w-[100%] flex flex-row justify-around items-center mt-[5%]'>
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
          <h1 className='text-xl font-semibold'>Your Answer</h1>
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
          <p>
            {resultAiData.content}
          </p>
        </div>
          : null
        }
        <div className='w-[100%] flex flex-row justify-around items-center mt-[5%]'>
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
          <h1 className='text-xl font-semibold'>All Articles</h1>
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
        </div>
      </div>
      <div className='h-[100vh] w-[100%] flex flex-wrap justify-center mt-2 p-3 gap-10'>
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
            <div className='h-max w-[100%] p-3 flex items-center justify-center'>
              <Buffering />
            </div>
          ))
          :
          (
            <div className='h-max w-[100%] p-3 flex items-center justify-center'>
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