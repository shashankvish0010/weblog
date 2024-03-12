import React from 'react'
import { Icon } from '@iconify/react';

const Loading: React.FC = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center blur'>
    <Icon icon="line-md:loading-loop" color='blue' height='4rem' />
    </div>
  )
}

export default Loading