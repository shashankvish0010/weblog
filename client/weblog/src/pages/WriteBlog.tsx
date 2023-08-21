import React, { useState, useRef } from 'react'
import JoditEditor from 'jodit-react';

const WriteBlog = () => {
    interface blogpost {
        title : '';
        description : '';
        tags : '';
    }
    const editor = useRef('');
    const [blog, setBlog] = useState<blogpost>({
        title : '',
        description : '',
        tags : ''
    })
    const handlechange = (e: React.ChangeEvent<HTMLInputElement> | React.ReactNode) => {
        const { name, value } = e.target
        setBlog((blog) => ({
            ...blog,
            [name] : value
        }))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(blog);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='h-[100vh] w-[100vw] flex flex-col items-center'>
           <form className='w-max h-[100vh] flex flex-col items-center justify-evenly gap-5' method="post">
            <span className='shadow overflow-auto'>
            <p className='text-xl font-semibold text-gray-600'>Title</p>
                <input className='p-2 w-[70vw] h-[6vh] border' type="text" name='title' value={blog.title} onChange={handlechange}/>
            </span>
            <span className='shadow overflow-auto'>
            <p className='text-xl font-semibold text-indigo-600'>Description</p>
                <JoditEditor className='overflow-auto' name='description' ref={editor} value={blog.description} onChange={handlechange}/>
            </span>
            <span className='shadow overflow-auto'>
            <p className='text-xl font-semibold text-gray-600'>Keyowrds / Tags</p>
                <input className='p-2 w-[70vw] h-[6vh] border' name='tags' value={blog.tags} onChange={handlechange}/>
            </span>
            <div className='text-center'>
            <button className='bg-indigo-600 w-[35vw] shadow-md rounded-sm p-2 text-md font-semibold text-white' onClick={handleSubmit}>Register</button>
            </div>
           </form>
    </div>
  )
}

export default WriteBlog