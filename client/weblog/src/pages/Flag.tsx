import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import { useParams } from 'react-router-dom'
interface dataStatus {
    success: boolean
    message: String
}
const Flag: React.FC = () => {
    const params = useParams();
    const editor = useRef(null)
    const [body, setBody] = useState('')
    const [status, setStatus] = useState<dataStatus>()
    const hanldeSubmit = async (PostId: String) => {
        try {
            const response = await fetch('/flag/post/' + PostId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    body
                })
            })
            if (response) {
                const data = await response.json();
                console.log(data);
                if (data.success === true) {
                    setStatus(data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='h-max w-screen p-3 gap-10 flex flex-col items-center'>
            {status?.success != true && document.cookie ?
                <>
                    <div className='h-max w-max flex flex-col items-center gap-3'>
                        <span className='text-2xl text-indigo-600 font-medium'>Specify Reason</span>
                        <div className='h-max w-[75vw]'>
                            <JoditEditor ref={editor} value={body} onChange={emailMessage => setBody(emailMessage)} />
                        </div>
                    </div>
                    <div className='h-max w-max'>
                        <button
                            onClick={() => { hanldeSubmit(params.id) }}
                            className='bg-indigo-600 w-[30vw] shadow-md rounded-sm p-2 text-base font-semibold text-white'
                        >
                            Send
                        </button>
                    </div>
                </>
                :
                <>
                    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
                        {document.cookie ?
                            <p className='text-indigo-600 title md:text-2xl text-xl font-bold text-center'>{status?.message}</p>
                            :
                            <p className='text-indigo-600 title md:text-2xl text-xl font-bold text-center'>Please Login</p>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Flag