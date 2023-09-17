import React, { useContext, useState } from 'react'
import { RegisterContext } from '../Context/UserReg'
import { useNavigate } from 'react-router-dom';

interface statusType {
    success: boolean;
    message: String;
}

const OTPverification: React.FC = () => {
    const Navigate = useNavigate()
    const regitserInfo = useContext(RegisterContext);
    console.log(regitserInfo);

    const [status, setStatus] = useState<statusType>({
        success: false, message: 'OTP sent, Please Check your inbox/spam folder'
    })
    const [otp, setOtp] = useState<Number>()

    const ResendOtp = async (UserId: String | undefined) => {
        try {
            const response = await fetch('https://weblog-backend-247o.onrender.com'+'/verify/account/re/' + UserId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response) {
                const data = await response.json();
                setStatus(data)
            } else {
                console.log("No Re OTP data fetched");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const OtpSubmit = async (UserId: String | undefined) => {
        console.log("user");

        try {
            const response = await fetch('https://weblog-backend-247o.onrender.com'+'/verify/account/' + UserId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    otp
                })
            });
            if (response) {
                const data = await response.json();
                setStatus(data)
                if (data.success === true) {
                    Navigate('/login')
                }
            } else {
                console.log("No OTP data fetched");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-5 p-3'>
            <span className='p-1 text-center font-semibold shadow-md'><p>{status?.message}</p></span>
            <div className='flex flex-col justify-around gap-5 border shadow-md w-max h-max p-4'>
                <div className='h-max w-max p-3 flex flex-col gap-5'>
                    <div className='text-2xl text-indigo-600 font-semibold'>
                        OTP
                    </div>
                    <div>
                        <input className='px-2 h-[2.25rem] w-[65vw] md:w-[25vw] border rounded' type="number" placeholder='Enter 4 digits OTP' value={Number(otp)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(Number(e.target.value))} />
                    </div>
                    <span className='h-[0.15rem] rounded-md w-[65vw] md:w-[25vw] bg-indigo-600 text-center'></span>
                    <div className='flex flex-row flex-wrap justify-around text-base'>
                        <p>Resend the OTP?</p>
                        <button className='bg-indigo-600 shadow-md rounded-sm text-md px-1 text-white' onClick={() => ResendOtp(regitserInfo?.registeredUserId)}>Resend</button>
                    </div>
                    <div className='text-center'>
                        <button className='bg-indigo-600 w-[20vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={() => OtpSubmit(regitserInfo?.registeredUserId)}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OTPverification