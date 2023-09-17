import React, { useState, createContext, useEffect, useReducer } from 'react'

interface ContextValue {
    AdminLogin : (e: React.FormEvent) => void;
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
    reducer: (state: any, type: any) => Promise<void>;
    dispatch: any;
    admin : adminCredentials;
    storeAdmin : adminInfo | null;
    status : credentialinfo
    state: any
}

interface adminCredentials {
    email : String;
    admin_password : String;
}

type Action = {
  type: String
}

interface adminInfo {
    id : String;
    firstname : String;
    lastname : String;
    email : String;
    admin_password : String;
    activation_key : String;
}

interface credentialinfo {
    success : boolean;
    message : String
}

export const AdminContext = createContext<ContextValue | null>(null);

export const AdminContextProvider = (props: any) => {
  const [status, setStatus] = useState<credentialinfo>({ success : false, message : ''})
    const storedAdmin = localStorage.getItem("admin");
    const initialAdmin = storedAdmin ? JSON.parse(storedAdmin) : null;
    const [storeAdmin, setStoreAdmin] = useState<adminInfo | null>(initialAdmin || null);    
    const [admin, setAdmin] = useState<adminCredentials>({
        email : '',
        admin_password : ''
    });

    const reducer = async (state: credentialinfo, action: Action) => {
      switch (action.type){
        case "ADMINLOGOUT" : {
          try {
            const res = await fetch('https://weblog-backend-247o.onrender.com'+'/admin/logout', {
              method: 'GET',
              headers: {
                'Content-Type' : 'application/json'
              }
            })
            if(res){
              setStoreAdmin(null);
              setStatus( (AdminState) => ({...AdminState, success : false, message : 'Logout'})); 
            }
            else{ console.log("Cant logout");
            }
          } catch (error) {
            console.log(error);
          }
          break
        }
      default:
        return state
    }
  }

  const initialState = {
    success: false,
    message: '',
  };

  const [state, dispatch] = useReducer<any>(reducer, initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAdmin(prevAdmin => ({
            ...prevAdmin,
            [name]:value
        }));
    }

    const AdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, admin_password } = admin;
      try {
          const response = await fetch('https://weblog-backend-247o.onrender.com'+'/admin/login', {
              method: 'POST',
              headers: { 'Content-type' : 'application/json' },
              body : JSON.stringify({ email, admin_password })
          });
          if(response) {
              const data = await response.json();
              if(data.success){
                setStoreAdmin(data.adminData);
              }
              setStatus( prevStatus => ({
                  ...prevStatus, success : data.success, message : data.message
              }))
          } else { console.log("data not sent") }
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(()=> {
        localStorage.setItem("admin", JSON.stringify(storeAdmin));
        document.cookie != '' && storeAdmin != null ? setStatus({success : true, message : "Login successfully"}) :
        setStatus({success : false, message : "Please Login"})
  }, [storeAdmin]);

    const info: ContextValue = {
      AdminLogin, dispatch, handleChange, storeAdmin, admin, status, state, 
      reducer: function (_state: any, _type: any): Promise<void> {
        throw new Error('Function not implemented.');
      },
    };

  return (
    <AdminContext.Provider value={info}>
        {props.children}
    </AdminContext.Provider>
  )
}