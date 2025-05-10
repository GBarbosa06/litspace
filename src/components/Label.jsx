import React from 'react'

const Label = ({children}) => {
  return (
    <label className='flex flex-col w-[30%]'>
        {children}
    </label>
  )
}

export default Label