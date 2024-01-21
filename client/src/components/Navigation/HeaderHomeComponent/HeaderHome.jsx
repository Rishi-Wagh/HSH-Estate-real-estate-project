import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import './headerHome.style.scss';
import { useSelector } from 'react-redux';
import Dropdownlist from '../../../Pages/Home/drop-down-list';


const HeaderHome = () => {
  const [navbar , setNavbar] = useState(false);
  const {currentUser} = useSelector((state)=> state.user);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
 
  const handleNavbar = () =>{
    if(window.scrollY >= 375){
      setNavbar(true);
    }else{
      setNavbar(false);
    }
  }

  window.addEventListener('scroll' , handleNavbar);

  return (
    <>
    { navbar &&
         <div className="home-nav-container">
            <div className="home-nav-logo">
              <p><span>HomeSweetHome</span>-Estate</p>
            </div>
            <div className="home-nav-links">
            <div>
                
              </div>
              <div>
                <div className='nav-home-link' >
                 PROPERTY-TYPE
                  <div className="header-property-type"
                     onMouseEnter={handleMouseEnter} 
                     onMouseLeave={handleMouseLeave}>
                      {isHovered && <Dropdownlist />}
                  </div>
                </div>
              </div>
              <div>
                <Link className='nav-home-link'
                to={'/hsh/search?searchTerm=&type=all&offer=true&parking=false&furnished=false&order=desc&sort=createdAt'}>
                  LATTEST OFFER
                </Link>
              </div>
              <div>
                <Link className='nav-home-link'
                 to={'/hsh/About'}>
                  ABOUT
                </Link>
              </div>
              <div>
                <Link className='nav-home-link'>
                  CONTACT
                </Link>
              </div>
              <div>
                <Link className='nav-home-link'
                 to={'/hsh/create-listing'}>
                  LISTING+
                </Link>
              </div>
              <div>
              {currentUser ? <Link className='nav-home-link'
              to={'/hsh/Profile'}>
                  SIGN-OUT
                </Link> : <Link className='nav-home-link'
                to={'/hsh/Sign-in'}>
                  LOG-IN
                </Link>}
              </div>
            </div>
         </div>
     }   
         <Outlet />
    </>
  )
}

export default HeaderHome