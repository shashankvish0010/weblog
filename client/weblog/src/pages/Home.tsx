import React, {useContext} from 'react'
import { UserContext } from '../Context/UserData'
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate()
  const subcontext = useContext(UserContext);
  const {id, email} = subcontext?.user
  const addSubscribe = async () => {
        try {
         const response = await fetch('/add/subscriber', {
          method: 'PUT',
          headers : {"Content-Type" : "appliaction/json"},
          body : JSON.stringify(
            {id,email} )
         })
         if(response) {
          const data = await response.json()
          console.log(data);
         }else {
          console.log("Can get any sub data");         
         }
        } catch (error) {
         console.log(error);
        }        
    }

  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='h-[40vh] w-[100vw] flex flex-col justify-center items-center gap-3 p-2'>
         <p className='title text-3xl font-bold text-center'>Latest news, updates, and stories for <span className='text-indigo-600'>developers</span></p>
         <p className='title text-xl font-bold'>to get latest updates</p>
         { subcontext?.loginstatus.success ? <button onClick={addSubscribe} className='bg-indigo-600 shadow-md rounded-sm p-2 text-base font-semibold text-white'>SUBSCRIBE</button>
         :<button onClick={ () => navigate('/login')} className='bg-indigo-600 shadow-md rounded-sm p-2 text-base font-semibold text-white'>Get Started for free</button> }
      </div>
      <div>
       <div className='w-[100vw] flex flex-row justify-around items-center'>
       <span className=' rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span> <h1 className='text-xl font-semibold'>All Articles</h1>  <span className=' rounded-md h-[0.15rem] bg-indigo-600 w-[30vw]'></span>
       </div>
      </div>
    </div>
  )
}

export default Home