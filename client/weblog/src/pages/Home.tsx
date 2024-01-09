import React, { useContext } from 'react'
// import { UserContext } from '../Context/UserData'
import { useNavigate } from 'react-router-dom';
import { postContext } from '../Context/PostData';
import { Icon } from '@iconify/react'
import PostContainer from '../components/PostContainer';
import Buffering from '../components/Buffering';
import Footer from '../components/Footer';

// interface PostInt {
//   id: String;
//   blog_id: '',
//   blog_title: '',
//   blog_image: '',
//   meta_description: '',
//   blog_description: '',
//   writer_firstname: '',
//   writer_lastname: '',
//   public_view: '',
// }

const Home: React.FC = () => {
  const navigate = useNavigate()
  const postinfo = useContext(postContext)
  // const usercontext = useContext(UserContext);
  // const [searchQuery, setSearchQuery] = useState<String>('')
  // const [resultData, setResultData] = useState<PostInt[] | undefined>()

  // const hanldeSearch = async () => {
  //   try {
  //     const response = await fetch( 'https://weblog-backend-247o.onrender.com'+'/search/post/' + searchQuery, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     if (response) {
  //       const data = await response.json();
  //       console.log(data);

  //       setResultData(data.filteredPosts)
  //     } else {
  //       console.log("No response");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   postinfo?.fetchPosts();
  // }, []);

  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='h-max w-[100vw] flex flex-col justify-evenly mt-3 mb-3 items-center gap-5 p-4'>
        <div className='h-[40vh] w-[100vw] flex md:flex-row flex-col items-center justify-evenly'>
          <div className='h-[30vh] w-[45%] flex flex-col gap-8 p-3'>
            <h2 className='text-5xl font-bold'>Your <span className='text-indigo-600'>coding</span> odyssey <span className='text-indigo-600'>begins.</span></h2>
            <p className='text-gray-700 font-semibold text-sm'>Elevate your code, empower your creativity, and connect with a community of developers on the ultimate blogging platform for tech enthusiasts</p>
           <span className='flex flex-row items-center gap-4'>
            <button
            onClick={() => navigate('/register')}
            className='bg-indigo-600 w-[10dvw] shadow-md rounded-sm p-2 text-base font-normal text-white'>
            Join WeBlog
          </button>
          <span className='h-max flex flex-row items-center'>
          <Icon icon="material-symbols:more-up" color="#3949ab" rotate={1} hFlip={true} height={'6vh'}/>
          <span className='text-base font-semibold text-indigo-600'>Learn More</span>
          </span>
          </span>
          </div>
          <div className='h-[100%] w-[30%] flex items-center justify-center overflow-hidden'>
            <img width={'350px'} src="https://img.freepik.com/free-vector/cross-platform-frameworks-abstract-concept-illustration_335657-1825.jpg?w=740&t=st=1704739131~exp=1704739731~hmac=4cf0b9c31acd2cca6e7cb51a2b72cab21804173a62c53f20b030d71ec3d01b27"/>
          </div>
        </div>
        {/* <div className='h-max w-max rounded-full p-1.5 text-base border-2 border-indigo-600 flex flex-row items-center'>
          <input className='md:w-[30vw] w-[70vw] placeholder:text-black placeholder:font-semibold' type="text" placeholder='Search' value={searchQuery.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
          <Icon onClick={hanldeSearch} className='cursor-pointer' icon="majesticons:search-line" color='#3949ab' />
        </div> */}
        {/* {usercontext?.user?.subscription === true ? (
          <p className='title text-xl font-bold'>Thanks for subscribing.</p>
        ) : (
          <p className='title text-xl font-bold'>To get latest updates</p>
        )} */}
        {/* {usercontext?.loginstatus.success === true && usercontext?.user ? (
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
        )} */}
      </div>
      <div>
        {/* <div className='w-[100vw] flex flex-row justify-around items-center'>
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
          <h1 className='text-xl font-semibold'>All Articles</h1>
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
        </div> */}
      </div>
      <div className='h-[100vh] w-[100vw] flex flex-wrap justify-center mt-2 p-3 gap-10'>
        {/* {resultData ? (resultData.length > 0 ?
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
        } */}
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
              {/* <Buffering /> */}
            </div>
          )
        }
        <Footer />
      </div>
    </div>
  );
};

export default Home;