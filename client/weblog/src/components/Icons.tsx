import React from 'react'
import {Icon} from '@iconify/react'

const Icons: React.FC = (props) => {
    return (
        <span className='h-max p-0.5 w-max border shadow'>
            <Icon icon={props.iconName} height={'6vh'} />
        </span>
    )
}

export default Icons