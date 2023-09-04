import React from 'react'
import { Icon } from '@iconify/react'

interface PropsType {
    iconName: any;
}

const Icons: React.FC<PropsType> = ({ iconName }) => {
    return (
        <span className='h-max p-0.5 w-max border shadow'>
            <Icon icon={iconName} height={'6vh'} />
        </span>
    )
}

export default Icons