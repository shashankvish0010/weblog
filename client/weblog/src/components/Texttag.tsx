import React from 'react'

interface PropsType {
  keywords: String
}
const Texttag: React.FC<PropsType> = ({ keywords }) => {
  return (
    <span className='bg-indigo-600 rounded-lg p-1 flex flex-row text-base font-medium text-white'>
      {keywords}
    </span>
  )
}

export default Texttag