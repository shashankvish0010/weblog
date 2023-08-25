import React, {useContext,useEffect} from 'react'
import { UserContext } from '../Context/UserData'
import { useNavigate } from 'react-router-dom';
import { postContext } from '../Context/PostData';
import PostContainer from '../components/PostContainer';
import Buffering from '../components/Buffering';

const Home: React.FC = () => {
  const navigate = useNavigate()
  const postinfo = useContext(postContext)
  const subcontext = useContext(UserContext);
  const handleSubscribeClick = () => {
    if (subcontext?.user) { 
      subcontext.addSubscribe(subcontext.user.id);
    }
  };

  const handleUnsubscribeClick = () => {
    if (subcontext?.user) { 
      subcontext.unSubscribe(subcontext.user.id);
    }
  };
  
  useEffect(()=> {
    postinfo?.fetchPosts();
  }, []);

  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='h-[40vh] w-[100vw] flex flex-col justify-center items-center gap-3 p-2'>
         <p className='title text-3xl font-bold text-center'>Latest news, updates, and stories for <span className='text-indigo-600'>developers</span></p>
         {subcontext?.user?.subscription === true ? (
          <p className='title text-xl font-bold'>Thanks for subscribing.</p>
        ) : (
          <p className='title text-xl font-bold'>To get latest updates</p>
        )}
        {subcontext?.loginstatus.success === true && subcontext?.user ? (
          subcontext?.user?.subscription === false ? (
            <button
              onClick={handleSubscribeClick}
              className='bg-indigo-600 shadow-md rounded-sm p-2 text-base font-semibold text-white'
            >
              SUBSCRIBE
            </button>
          ) : (
            <button
              onClick={handleUnsubscribeClick}
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
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>{' '}
          <h1 className='text-xl font-semibold'>All Articles</h1>{' '}
          <span className='rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
        </div>
      </div>
      <div className='h-[100vh] w-[100vw] flex flex-wrap justify-center mt-2 p-3 gap-10'>
      { postinfo?.allposts?.length? ( ( postinfo.allposts.length> 0) ?
      (postinfo?.allposts.map( (post: any) => 
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
            <Buffering/>
          </div>
        ))
        :
        (
        <div className='h-max w-[100vw] p-3 flex items-center justify-center'>
          <Buffering/>
        </div>
        )
      }
      </div>
    </div>
  );
};

export default Home;