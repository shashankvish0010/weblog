import React, { createContext, useEffect, useState } from 'react'

interface ContextValue {
  Login: (input: userInput) => Promise<void>;
  Logout: () => Promise<void>;
  fetchPostsData: (email: String) => Promise<void>;
  addSubscribe: (id: String) => Promise<void>;
  unSubscribe: (id: String) => Promise<void>;
  loginstatus: userStatus;
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

  const Login = async (input: userInput) => {

    const { email, user_password } = input;
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, user_password })
      });
      if (response) {
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setUser(
            (data.userData)
          );
        }
        setLoginStatus((
          { success: data.success, message: data.message }
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
          'Content-Type': 'application/json'
        }
      })
      if (res) { setLoginStatus({ success: false, message: 'Logout' }); setUser(''); }
      else {
        console.log("Cant logout");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addSubscribe = async (id: String) => {
    try {
      const response = await fetch(`/add/subscriber/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" }
      })
      if (response) {
        const data = await response.json()
        console.log(data);
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
  };

  const unSubscribe = async (id: String) => {
    try {
      const response = await fetch(`/unsubscribe/${id}`, {
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
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    document.cookie != '' && user != null ? setLoginStatus({ success: true, message: 'User login' }) : setLoginStatus({ success: false, message: 'Please Login' })
  }, [user]);

  const info: ContextValue = { Login, Logout, unSubscribe, addSubscribe, user, loginstatus }
  return (
    <UserContext.Provider value={info}>
      {props.children}
    </UserContext.Provider>
  )
}
