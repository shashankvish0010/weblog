import React from 'react'
import { Icon } from '@iconify/react'

interface blogpostbody {
title: String;
image: String;
description: String;
tags: String;
firstname: String;
lastname: String;
email: String
}

const Post: React.FC = () => {
    // const { title, image, description, tags, firstname, lastname, email } = props;
    return (
        <div className='h-[100vh] w-[100vw] flex flex-col items-center p-3 gap-6'>
            <div className='text-3xl font-semibold'>
                {title}
            </div>
            <div>
                <img src={image} height={400} width={800} />
            </div>
            <div>
                {description}
            </div>
            <div>
                {tags}
            </div>
            <div className='flex flex-row items-center justify-evenly'>
                <div><Icon icon="formkit:avatarman" height='5vh' color='indigo' /></div>
                <div className='flex md:flex-row flex-col p-2 gap-2'>
                    <p>{firstname} {lastname}</p>
                    <p>{email}</p>
                </div>
            </div>
        </div>
    )
}

export default Post