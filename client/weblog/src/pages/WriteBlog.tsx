import React , {useContext, useRef, useState}from 'react'
import JoditEditor from 'jodit-react'
import { UserContext } from '../Context/UserData';
import { AdminContext } from '../Context/AdminData';

interface blogdata {
    title : String;
    image : String;
    tags : String
}
const WriteBlog: React.FC = () => {
    const userinfo = useContext(UserContext);
    const admininfo = useContext(AdminContext);
    const editor = useRef(null)
    const [blog, setBlog] = useState<blogdata>({
        title : '',
        image : '',
        tags : ''
    })
    const [description, setDescription] = useState('')

    const handlechange = (e: React.ChangeEvent<any>)=>{
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

    const hanldesubmit = async () => {
       const { title, image, tags } = blog;
       const id: String = userinfo?.user.id || admininfo?.storeAdmin.id
       try {
        const response = await fetch('/public/blogpost', {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body: JSON.stringify({
               id, title, image, description, tags
            }
            )
        })
            if(response){
                const data = await response.json();
                console.log(data);  
            }else {
                console.log("Post can get data");
            }
        }
        catch (error) {
        console.log(error);
       }
    }

  return (
    <div>
        <div>
            <form method="POST" className='flex flex-col'>
                <input className='border' type="text" value={blog.title} onChange={handlechange} name='title'/>
                <div>
                    <label id='imageupload'>
                        <span>choose file</span>
                        <input  className='hidden' type="file" name='image' accept='images/*' onChange={handlechange}/>
                    </label>
                    {blog.image === '' || blog.image === null ? <p>No images selected</p> : <img height={500} width={700} src={blog.image} />}
                </div>
                <JoditEditor ref={editor} value={description} onChange={newDescription=>setDescription(newDescription)} />
                <input className='border' type="text" value={blog.tags} onChange={handlechange} name='tags' />
            </form>
            <button onClick={hanldesubmit}>Submit</button>
        </div>
    </div>
  )
}

export default WriteBlog