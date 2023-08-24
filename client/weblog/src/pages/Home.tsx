import React, {useContext} from 'react'
import { UserContext } from '../Context/UserData'
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate()
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
    </div>
  );
};

export default Home;