import React, {createContext, useEffect, useState} from 'react'

interface ContextValue {
  Login: (input: userInput) => Promise<void>;
  Logout: () => Promise<void>;
  loginstatus: userStatus;
  user : any
  }
interface userInput {
  email: String,
  user_password: String
}

interface userStatus {
  success : boolean
  message : String
}

export const UserContext = createContext<ContextValue | null>(null)

export const UserContextProvider = (props: any) => {
  const [loginstatus, setLoginStatus] = useState<userStatus>({ success : false, message : ''})
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

  const Login = async (input: userInput) => {

    const { email, user_password } = input;
  try {
      const response = await fetch('/user/login', {
          method: 'POST',
          headers: { 'Content-type' : 'application/json' },
          body : JSON.stringify({ email, user_password })
      });
      if(response) {
          const data = await response.json();
          console.log(data);
          setUser(
            (data.userData)
          )
          setLoginStatus((
             {success: data.success, message: data.message}
          ))
      } else { console.log("data not sent") }
  } catch (error) {
      console.log(error);
  }
}

const Logout = async () => {
  try {
    const res = await fetch('/user/logout', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    if(res){setUser(''); setLoginStatus({ success : false, message : 'Logout' })}
    else{ console.log("Cant logout");
    }
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=> {
  localStorage.setItem("user", JSON.stringify(user))
}, [user]);

    const info: ContextValue = {Login, Logout,user, loginstatus}
  return (
   <UserContext.Provider value={info}>
    {props.children}
    </UserContext.Provider>
  )
}
