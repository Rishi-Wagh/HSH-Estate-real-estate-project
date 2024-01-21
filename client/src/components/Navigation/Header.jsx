import React from 'react'
import './header.style.scss'

import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchField from './searchComponent/SearchField'

const Header = () => {
 const { currentUser } = useSelector( state => state.user);

  return (
    <>
     <div className='container'>

<div className="left">

  <Link to={'/'} style={{textDecoration : 'none'}}>
    <div className="logo">
      <span className='rlogo'>HSH</span>
      <span className='llogo'>estate</span>
   </div> 
    </Link>

 <SearchField /> 

</div>
   
   <div className="right">
    
    <Link to={'/hsh/about'} style={{textDecoration : 'none'}}>
      <div className="profile">
        <span>About</span>
      </div>
    </Link>
   
    {currentUser ? 
     (<Link to={'/hsh/profile'} style={{textDecoration : 'none'}}>
       <img src={currentUser.avtar} alt="profile" className='profileimg'/> 
       </Link>
       ) : ( 
     <Link to={'/hsh/Sign-in'} style={{textDecoration : 'none'}}>
     <div className="profile">
       <span>Log In</span>
     </div>
     </Link>)  
    }
    
   </div>
            
</div>
<Outlet />
    </>
   
  )
}

export default Header