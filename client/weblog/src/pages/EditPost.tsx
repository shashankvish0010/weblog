import React, { useEffect, useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';


interface datafetch {
    success: boolean;
    message: String;
}

const EditPost: React.FC = () => {
    const { id } = useParams()

    const editor = useRef(null)
    // const [post, setPost] = useState<blogpostbody>();

    const [blog, setBlog] = useState({
        title: '',
        image: '',
        meta: '',
        tags: ''
    })


    const LoadPost = async (UserId: String) => {
        try {
            const response = await fetch(process.env.BACKEND_URL+'/view/post/' + UserId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                const data = await response.json();
                if (data.success) {
                    setBlog((prev) => ({
                        ...prev,
                        title: data.blogData.blog_title,
                        image: data.blogData.blog_image,
                        meta: data.blogData.meta_description,
                        tags: data.blogData.blog_keywords
                    }))
                    setDescription(data.blogData.blog_description)
                }
                else {
                    console.log("Error occurred")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (id) {
        useEffect(() => { LoadPost(id) }, [])
    }

    const [description, setDescription] = useState('')
    const [status, setStatus] = useState<datafetch>({ success: false, message: '' })

    const handlechange = (e: React.ChangeEvent<any>) => {
        const { name, value, files } = e.target;

        if (name === "image" && files && files.length > 0) {
            console.log("enter");

            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                setBlog((prev: any) => ({
                    ...prev,
                    image: reader.result
                }));
                console.log(reader.result);

            };

            reader.onerror = () => {
                setBlog((prev: any) => ({
                    ...prev,
                    image: ""
                }));
            };
        } else {
            setBlog((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const hanldeSubmit = async (key: boolean) => {
        const { title, image, meta, tags } = blog;
        try {
            const response = await fetch(process.env.BACKEND_URL+'/edit/blogpost', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id, title, image, meta, description, tags, key
                }
                )
            })
            if (response) {
                const data = await response.json();
                setStatus((prevStatus: datafetch) => ({
                    ...prevStatus,
                    success: data.success, message: data.message
                }))
            } else {
                console.log("Post can get data");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='h-max w-[100vw] flex flex-col items-center gap-5 p-3'>
                {status.success === false && document.cookie ?
                    (<><span className='p-1 text-center font-semibold shadow-md'><p>{status.message}</p></span>
                        <form method="PUT" className='h-max w-max flex flex-col items-center gap-5'>
                            <span className='text-2xl text-indigo-600 font-medium'>Title</span>
                            <input className='border-indigo-600 border rounded shadow w-[75vw] h-[7vh] px-2' type="text" value={blog.title} onChange={handlechange} name='title' />
                            <div className='bg-indigo-600 rounded w-[65vw] h-max p-3 text-white items-center justify-evenly flex flex-col'>
                                <label id='imageupload' className='cursor-pointer flex gap-2 flex-col items-center'>
                                    <span>Choose Image</span>
                                    <Icon icon="bxs:image-add" height='4vh' />
                                    <input className='hidden' type="file" name='image' accept='images/*' onChange={handlechange} />
                                </label>
                                {blog.image === '' || blog.image === null ? <p>No images selected</p> : <img height={500} width={700} src={blog.image} />}
                            </div>
                            <span className='text-2xl text-indigo-600 font-medium'>Description</span>
                            <div className='h-max w-[75vw]'>
                                <JoditEditor ref={editor} value={description} onChange={newDescription => setDescription(newDescription)} />
                            </div>
                            <span className='text-2xl text-indigo-600 font-medium'>Meta Description - 100 words</span>
                            <textarea className='border-indigo-600 border rounded shadow w-[75vw] h-max p-1' value={blog.meta} onChange={handlechange} name='meta' />
                            <span className='text-2xl text-indigo-600 font-medium'>Keywords / Tags</span>
                            <input className='border-indigo-600 border rounded shadow w-[75vw] h-[7vh] px-2' type="text" value={blog.tags} onChange={handlechange} name='tags' />
                        </form><div className='flex md:flex-row flex-col items-center gap-5'>
                            <button
                                onClick={() => hanldeSubmit(true)}
                                className='bg-indigo-600 w-[30vw] shadow-md rounded-sm p-2 text-base font-semibold text-white'
                            >
                                Save
                            </button>
                            <button
                                onClick={() => hanldeSubmit(false)}
                                className='bg-black w-[30vw] shadow-md rounded-sm p-2 text-base font-semibold text-white'
                            >
                                Keep it Private
                            </button>
                        </div></>)
                    :
                    (
                        <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
                            {document.cookie ?
                                <p className='text-indigo-600 title md:text-2xl text-xl font-bold text-center'>{status.message}</p>
                                :
                                <p className='text-indigo-600 title md:text-2xl text-xl font-bold text-center'>Please Login</p>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default EditPost