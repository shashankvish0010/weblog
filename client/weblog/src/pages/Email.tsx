import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'

const Email: React.FC = () => {
    const editor = useRef(null)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const hanldeSubmit = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL+'/send/updates', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title, body
                })
            })
            if (response) {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='h-max w-screen p-3 gap-10 flex flex-col items-center'>
            <div className='h-max w-max flex flex-col items-center gap-3'>
                <span className='text-2xl text-indigo-600 font-medium'>Email Subject</span>
                <input className='border-indigo-600 border rounded shadow w-[75vw] h-[7vh] px-2' type="text" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} name='title' />
            </div>
            <div className='h-max w-max flex flex-col items-center gap-3'>
                <span className='text-2xl text-indigo-600 font-medium'>Email Body</span>
                <div className='h-max w-[75vw]'>
                    <JoditEditor ref={editor} value={body} onChange={emailMessage => setBody(emailMessage)} />
                </div>
            </div>
            <div className='h-max w-max'>
                <button
                    onClick={hanldeSubmit}
                    className='bg-indigo-600 w-[30vw] shadow-md rounded-sm p-2 text-base font-semibold text-white'
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Email