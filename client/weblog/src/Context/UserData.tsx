import { createContext, useEffect, useState, useReducer } from 'react'

interface ContextValue {
  fetchPostsData: (email: String) => Promise<void>;
  reducer: (state: any, action: any) => Promise<void>;
  loginstatus: userStatus;
  state: any
  dispatch: any
  user: any;
  setUser: any
}

interface userStatus {
  success: boolean
  message: String
}

export const UserContext = createContext<ContextValue | null>(null)

export const UserContextProvider = (props: any) => {
  const [loginstatus, setLoginStatus] = useState<userStatus>({ success: false, message: '' })
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null
  const [user, setUser] = useState(initialUser || null)
  const reducer = async (state: String, action: { type: string; data?: any, id?: String }) => {
    switch (action.type) {
      case "LOGIN": {
        try {
          const { email, user_password } = action.data;
          const response = await fetch('https://weblog-backend-247o.onrender.com'+'/user/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, user_password })
          });
          if (response) {
            const data = await response.json();
            if (data.success) {
              setUser(data.userData);
              document.cookie = `jwt=${data.token}; path=/`
            }
            setLoginStatus( (Loginstate) => ({...Loginstate, success: data.success, message: data.message }))
          } else {
            console.log("data not sent");
          }
        } catch (error) {
          console.log(error);
        }
        break;
      }
  
      case "LOGOUT": {
        // try {
        //   const res = await fetch('https://weblog-backend-247o.onrender.com'+'/user/logout', {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   });
        //   if (res) {
        //     setUser('');
        //     setLoginStatus( (Loginstate) => ({...Loginstate, success: false, message: "Please Login" }))
        //   }
        //   else {
        //     console.log("Cant logout");
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
        const cookie = document.cookie;
        document.cookie = cookie + ";max-age=0";
        console.log(cookie);
        
        setUser('');
        setLoginStatus( (Loginstate) => ({...Loginstate, success: false, message: "Please Login" }))
        break;
      }

      case "SUBSCRIBE": {
        try {
          const response = await fetch('https://weblog-backend-247o.onrender.com'+'/add/subscriber/'+action.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" }
          })
          if (response) {
            const data = await response.json()
            if (data.success) {
              setUser(data.userData); // Update user data
            } else {
              console.log("addSubscribe Error:", data.message);
            }
          } else {
            console.log("Can get any sub data");
          }
        } catch (error) {
          console.log(error);
        }
        break;
      }

      case "UNSUBSCRIBE": {
        try {
          const response = await fetch('https://weblog-backend-247o.onrender.com'+'/unsubscribe/'+action.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" }
          })
          if (response) {
            const data = await response.json()
            console.log(data);
            if (data.success) {
              setUser(data.userdata); // Update user data
            } else {
              console.log("addSubscribe Error:", data.message);
            }
          } else {
            console.log("Cant get any sub data");
          }
        } catch (error) {
          console.log(error);
        }
        break;
      }

      default:
        return state;
    }  
  }
  const initialState = ''
  const [state, dispatch] = useReducer<any>(reducer, initialState);  

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    document.cookie != null && user != null ? setLoginStatus({ success: true, message: 'User login' }) : setLoginStatus({ success: false, message: 'Please Login' })
  }, [user]);


  const info: ContextValue = {
     dispatch, user, state, loginstatus,
    fetchPostsData: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    reducer: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    setUser: undefined
  }
  return (
    <UserContext.Provider value={info}>
      {props.children}
    </UserContext.Provider>
  )
}
