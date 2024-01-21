import React from 'react'

const UpdateListing = () => {
  return (
    <div>
      <div className='update-container'>
       <form onSubmit={handleUpdate} className='update-box' >
        <h1>Update</h1>
          <input
              ref={fileRef}
              type="file" 
              hidden
              accept='image/.*'
              onChange={(e)=>setPhoto(e.target.files[0])}
              />
          <img 
              className='update-img'
              src={currentUser.avtar} 
              onClick={()=>fileRef.current.click()} />
              {progessPercentage}
          <input 
              className='update-input'
              type="text" 
              placeholder='username'
              name='username'
              defaultValue={currentUser.username}
              onChange={handleFormData}
               />
          <input 
              className='update-input'
              type="text" 
              placeholder='email'
              name='email'
              defaultValue={currentUser.email}
              onChange={handleFormData}
               />
          <input 
              className='update-input'
              type="password" 
              placeholder='password'
              name='password'
              defaultValue={currentUser.password}
              onChange={handleFormData}
               />
          <button className='update-btn'>update</button>
       </form>
    </div>
    </div>
  )
}

export default UpdateListing