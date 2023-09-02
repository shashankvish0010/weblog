import React, { createContext, useEffect, useState, useReducer } from 'react'

interface ContextValue {
  Login: (input: userInput) => Promise<void>;
  Logout: () => Promise<void>;
  fetchPostsData: (email: String) => Promise<void>;
  addSubscribe: (id: String) => Promise<void>;
  unSubscribe: (id: String) => Promise<void>;
  reducer: (state: any, action: any) => Promise<void>;
  loginstatus: userStatus;
  state: any
  dispatch: any
  user: any;
  setUser: any
}
interface userInput {
  email: String,
  user_password: String
}

interface userStatus {
  success: boolean
  message: String
}

export const UserContext = createContext<ContextValue | null>(null)

export const UserContextProvider = (props: any) => {
  const [loginstatus, setLoginStatus] = useState<userStatus>({ success: false, message: '' })
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
  const reducer = async (_state: userStatus, action: { type: string; data?: any, id?: String }) => {
    switch (action.type) {
      case "LOGIN": {
        try {
          const { email, user_password } = action.data;
          const response = await fetch('/user/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, user_password })
          });
          if (response) {
            const data = await response.json();
            if (data.success) {
              setUser(data.userData);
            }
            setLoginStatus( (state) => ({...state, success: data.success, message: data.message }))
          } else {
            console.log("data not sent");
          }
        } catch (error) {
          console.log(error);
        }
        break;
      }
  
      case "LOGOUT": {
        try {
          const res = await fetch('/user/logout', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (res) {
            setUser('');
            setLoginStatus( (state) => ({...state, success: false, message: "Please Login" }))
          }
          else {
            console.log("Cant logout");
          }
        } catch (error) {
          console.log(error);
        }
        break;
      }

      case "SUBSCRIBE": {
        try {
          const response = await fetch(`/add/subscriber/${action.id}`, {
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
          const response = await fetch(`/unsubscribe/${action.id}`, {
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
        return loginstatus; // Move the default return statement outside of the switch
    }  
  }
  console.log(loginstatus);
  
  const [state, dispatch] = useReducer(reducer, '');  

  const addSubscribe = async (id: String) => {

  };

  const unSubscribe = async (id: String) => {

  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    document.cookie != null && user != null ? setLoginStatus({ success: true, message: 'User login' }) : setLoginStatus({ success: false, message: 'Please Login' })
  }, [user]);


  const info: ContextValue = {  unSubscribe, addSubscribe, dispatch, user,state, loginstatus }
  return (
    <UserContext.Provider value={info}>
      {props.children}
    </UserContext.Provider>
  )
}
