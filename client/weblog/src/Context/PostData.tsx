import { createContext, useEffect, useState } from 'react'

interface ContextValue {
    fetchPosts: () => Promise<void>;
    LoadPost: (Postid: string | undefined) => Promise<void>;
    DeletePost: (PostId: String) => Promise<void>;
    FlagPost: (PostId: String) => Promise<void>;
    blogdata: postbody | undefined;
    setBlogData: any;
    allposts: allblogs[] | undefined;
    deletePost: datastatus;
    postStatus: datastatus;
    setPostStatus: any
}

interface datastatus {
    success: boolean;
    message: String
}

interface allblogs {
    id: String;
    blog_id: '',
    blog_title: '',
    blog_image: '',
    meta_description: '',
    blog_description: '',
    writer_firstname: '',
    writer_lastname: '',
    public_view: boolean,
}

interface postbody {
    id: String;
    blog_title: String;
    blog_image: string | undefined;
    blog_description: String;
    meta_description: String;
    blog_keywords: String;
    writer_firstname: String;
    writer_lastname: String;
    writer_email: String;
    posted: String | undefined;
}

export const postContext = createContext<ContextValue | null>(null);

export const PostContextProvider = (props: any) => {
    const [postStatus, setPostStatus] = useState<datastatus>({ success: false, message: '' })
    const [allposts, SetAllPosts] = useState<allblogs[]>()
    const [deletePost, setDeletePost] = useState<datastatus>({ success: false, message: '' })
    const [blogdata, setBlogData] = useState<postbody>() 
    
    const fetchPosts = async () => {
        try {
            const response = await fetch('https://weblog-backend-247o.onrender.com'+'/api/posts', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                const data = await response.json();
                if (data.success) {
                    SetAllPosts(
                        (data.blogs))
                }
                else {
                    console.log(data.message);
                }
            } else {
                console.log("Posts not recieved");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const LoadPost = async (Postid: string | undefined) => {
        console.log('call');

        try {
            const response = await fetch('https://weblog-backend-247o.onrender.com'+'/view/post/' + Postid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                const data = await response.json();
                if (data.success) {
                    setBlogData(data.blogData)
                    setPostStatus((prev: any) => ({
                        ...prev,
                        success: data.success, message: data.message
                    }))
                }
                else {
                    setPostStatus((prev: any) => ({
                        ...prev,
                        success: data.success, message: data.message
                    }))
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const DeletePost = async (PostId: String) => {
        try {
            const response = await fetch('https://weblog-backend-247o.onrender.com'+'/delete/post/'+PostId, {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            if(response){
                const data = await response.json()
                console.log(data);
                setDeletePost(data)
            }else{
                console.log("Delete request falied");
            }
        } catch (error) {
            console.log(error);
        }
    }

    

    const FlagPost = async (PostId: String) => {
        console.log("enter");
        
        try {
            const response = await fetch('https://weblog-backend-247o.onrender.com'+'/flag/post/'+PostId, {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            if(response){
                const data = await response.json()
                console.log(data);
                
            }else{
                console.log("Delete request falied");
            }
        } catch (error) {
        }     
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    const info: ContextValue = { fetchPosts, DeletePost, FlagPost, allposts, deletePost, blogdata, setBlogData, LoadPost, postStatus, setPostStatus };

    return (
        <postContext.Provider value={info}>
            {props.children}
        </postContext.Provider>
    )
}
