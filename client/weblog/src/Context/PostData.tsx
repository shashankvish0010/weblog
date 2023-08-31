import { createContext, useEffect, useState } from 'react'

interface ContextValue {
    fetchPosts: () => Promise<void>;
    LoadPost: (Postid: String) => Promise<void>;
    DeletePost: (PostId: String) => Promise<void>;
    FlagPost: (PostId: String) => Promise<void>;
    blogdata: blogpostbody | undefined;
    setBlogData: any;
    allposts: allblogs[];
    deletePost: datastatus;
    postStatus: datastatus;
    setPostStatus: any
}

interface datastatus {
    success: boolean;
    message: String
}

interface allblogs {
    blog_id: '',
    blog_title: '',
    blog_image: '',
    meta_description: '',
    blog_description: '',
    writer_firstname: '',
    writer_lastname: '',
    public_view: '',
}

interface blogpostbody {
    id: String;
    title: String;
    image: String;
    description: String;
    meta: String;
    tags: String;
    firstname: String;
    lastname: String;
    email: String;
}

export const postContext = createContext<ContextValue | null>(null);

export const PostContextProvider = (props: any) => {
    const [postStatus, setPostStatus] = useState<datastatus>({ success: false, message: '' })
    const [allposts, SetAllPosts] = useState<allblogs[]>()
    const [deletePost, setDeletePost] = useState<datastatus>({ success: false, message: '' })
    const [blogdata, setBlogData] = useState<blogpostbody>()

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts', {
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

    const LoadPost = async (Postid: String) => {
        console.log('call');

        try {
            const response = await fetch('/view/post/' + Postid, {
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
            const response = await fetch('/delete/post/'+PostId, {
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
            const response = await fetch('/flag/post/'+PostId, {
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

    const info = { fetchPosts, DeletePost, FlagPost, allposts, deletePost, blogdata, setBlogData, LoadPost, postStatus, setPostStatus };

    return (
        <postContext.Provider value={info}>
            {props.children}
        </postContext.Provider>
    )
}
