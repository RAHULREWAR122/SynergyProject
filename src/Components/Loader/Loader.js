import React from 'react'
// loader function
function Loader() {
  return (
    <div className='fixed h-[100%] w-[100%] top-0 left-0 bg-white flex justify-center items-center'>
          <div className=''>
                <img src="/loader.gif" alt="Loader" />
          </div>
    </div>
  )
}

export default Loader