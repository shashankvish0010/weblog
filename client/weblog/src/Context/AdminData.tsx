import React, { useState, createContext, useEffect } from 'react'

interface ContextValue {
    AdminLogin : () => Promise<void>;
    AdminLogout : () => Promise<void>;
    handleChange : () => Promise<void>;
    admin : adminCredentials;
    storeAdmin : adminInfo;
    status : credentialinfo
}

interface adminCredentials {
    email : String;
    admin_password : String;
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
    const [status, setStatus] = useState({ success : false, message : ''})
    const [storeAdmin, setStoreAdmin] = useState(JSON.parse(localStorage.getItem("admin")) || null)
    const [admin, setAdmin] = useState<adminCredentials>({
        email : '',
        admin_password : ''
    });

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
          const response = await fetch('/admin/login', {
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

  const AdminLogout = async () => {
    try {
      const res = await fetch('/admin/logout', {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      if(res){setStatus({ success : false, message : 'Logout' }); setStoreAdmin('');}
      else{ console.log("Cant logout");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
        localStorage.setItem("admin", JSON.stringify(storeAdmin));
        document.cookie ? setStatus({success : true, message : "Login successfully"}) :
        setStatus({success : false, message : "Please Login"})
  }, [storeAdmin]);

    const info = {AdminLogin, AdminLogout, handleChange, storeAdmin, admin, status};

  return (
    <AdminContext.Provider value={info}>
        {props.children}
    </AdminContext.Provider>
  )
}