import React from 'react'
import { CgSpinner } from 'react-icons/cg'

function LoadingSpinner() {
  return (
    <div className='pt-16 flex items-center justify-center'>
      <CgSpinner className='animate-spin text-6xl' />
    </div>
  )
}

export default LoadingSpinner