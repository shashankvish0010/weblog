import React, { useState, createContext } from 'react'

interface ContextValue {
    user: userdata;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    registeredUserId: String | undefined;
    status: authinfo
}

interface authinfo {
    success: boolean;
    message: String
}


interface userdata {
    firstname: String;
    lastname: String;
    email: String;
    user_password: String;
    confirm_password: String
}

export const RegisterContext = createContext<ContextValue | null>(null);

export const RegisterContextProvider = (props: any) => {

    const [registeredUserId, setRegisteredUserId] = useState()
    const [user, setUser] = useState<userdata>({
        firstname: '',
        lastname: '',
        email: '',
        user_password: '',
        confirm_password: '',
    });
    const [status, setStatus] = useState({ success: false, message: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { firstname, lastname, email, user_password, confirm_password } = user;
        try {
            const response = await fetch('https://weblog-backend-247o.onrender.com/user/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, email, user_password, confirm_password })
            })
            if (response) {
                const data = await response.json();
                console.log(data);
                
                if (data.success === true) {
                    setRegisteredUserId(data.id)
                    console.log(registeredUserId);

                }
                setStatus(prevStatus => ({
                    ...prevStatus, success: data.success, message: data.message
                }))
            } else { console.log("data not sent") }
        } catch (error) {
            console.log(error);
        }
    }

    const info: ContextValue = { handleChange, handleSubmit, registeredUserId, user, status }
    return (
        <RegisterContext.Provider value={info}>
            {props.children}
        </RegisterContext.Provider>
    )
}