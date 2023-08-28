import React from 'react'

const Texttag: React.FC = (props) => {
  return (
    <span className='bg-indigo-600 rounded-lg p-1 flex flex-row text-base font-medium text-white'>
        {props.keywords}
    </span>
  )
}

export default Texttag