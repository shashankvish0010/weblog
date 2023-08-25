import {createContext, useEffect, useState} from 'react'

interface ContextValue {
    fetchPosts: () => Promise<void>;
    LoadPost: (Postid: String) => Promise<void>;
    blogdata: blogpostbody;
    allposts: [blogpostbody];
}

interface blogpostbody {
    id: String;
    title: String;
    image: String;
    description: String;
    tags: String;
    firstname: String;
    lastname: String;
    email: String;
    }

export const postContext = createContext<ContextValue | null>(null);

export const PostContextProvider = (props: any) => {
    const [allposts, SetAllPosts] = useState()

    const [blogdata, setBlogData] = useState<blogpostbody>()

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts', {
                method: 'GET',
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            if(response){
                const data = await response.json();
                console.log(data);  
                SetAllPosts(data.AllblogData) 
            }else{
                console.log("Posts not recieved");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const LoadPost = async (Postid: String) => {
        try {
            const response = await fetch(`/view/post/${Postid}`, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            if(response){
                const blogData = await response.json();
                setBlogData(blogData)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      fetchPosts();
    }, [allposts])
    

    const info = {fetchPosts, LoadPost, allposts, blogdata};

  return (
    <postContext.Provider value={info}>
        {props.children}
    </postContext.Provider>
    )
}
