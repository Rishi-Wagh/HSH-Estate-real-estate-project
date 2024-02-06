import React, { useEffect, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import './home.style.scss';
import EmailIcon from '@mui/icons-material/Email';
import ReactPlayer from 'react-player/youtube';
import circleImg from '../../assets/pexels-kaboompics-com-5697.jpg';
import TwitterIcon from '@mui/icons-material/Twitter';
import pp1 from '../../assets/pp1.jpg';
import pp2 from '../../assets/pp2.jpg';
import pp3 from '../../assets/pp3.jpg';
import { useSelector } from 'react-redux';
import Dropdownlist from './drop-down-list';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state)=> state.user);
  const [isHovered, setIsHovered] = useState(false);
  const [counterOn , setCounterOn] = useState(false);
  const [open, setOpen] = React.useState(false);

  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleClickOpen = () => {
    if(!currentUser){
      navigate('/hsh/Sign-Up');
    }else{
      setOpen(true);
    }  
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='home-page'>
      {/*top img navbar*/}
      <div className="hoome-img-top">
           <div className="home-top-logo">
              <div className="logo-container">
              </div>
           </div>
           <div className="home-top-navbar">
              <div className="home-contact-nav-box">
                  <div className="home-contact">
                    <EmailIcon style={{marginLeft: '10px' , marginRight:'10px'}}/> <span>rushi8210wagh@gmail.com</span>
                  </div>
                  <div className="home-nav-box">
                     <div className="triangle"></div>
                     <div className="home-nav">
                       <div className='property-type' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        PROPERTY_TYPE
                        {isHovered && <Dropdownlist />}
                       </div>
                        <Link className="home-nav-link" 
                              style={{all: 'unset' ,
                                fontSize: 'large' ,
                                paddingLeft: '10px' ,
                                paddingRight: '10px' ,
                                cursor: 'pointer'}} 
                          to={'/hsh/search?searchTerm=&type=all&offer=true&parking=false&furnished=false&order=desc&sort=createdAt'}>
                          LATEST OFFER
                        </Link>
                        <Link className="home-nav-link" 
                              to={'/hsh/About'}
                              style={{all: 'unset' ,
                                fontSize: 'large' ,
                                paddingLeft: '10px' ,
                                paddingRight: '10px' ,
                                cursor: 'pointer'}}>
                          ABOUT
                        </Link>
                        <Link className="home-nav-link" 
                              style={{all: 'unset' ,
                                fontSize: 'large' ,
                                paddingLeft: '10px' ,
                                paddingRight: '10px' ,
                                cursor: 'pointer'}}>
                          CONTACT
                        </Link>
                        <Link className="home-nav-link" 
                              to={'/hsh/create-listing'}
                              style={{all: 'unset' ,
                                fontSize: 'large' ,
                                paddingLeft: '10px' ,
                                paddingRight: '10px' ,
                                cursor: 'pointer'}}>
                          LISTING+
                        </Link>
                        {currentUser ? <Link className="home-nav-link" 
                              to={'/hsh/Profile'}
                              style={{all: 'unset' ,
                                fontSize: 'large' ,
                                paddingLeft: '10px' ,
                                paddingRight: '10px' ,
                                cursor: 'pointer'}}>
                          SIGN-OUT
                        </Link> : <Link className="home-nav-link" 
                              to={'/hsh/Sign-in'}
                              style={{all: 'unset' ,
                                fontSize: 'large' ,
                                paddingLeft: '10px' ,
                                paddingRight: '10px' ,
                                cursor: 'pointer'}}>
                          LOG-IN
                        </Link>}
                     </div>
                  </div>
              </div>
            </div>
      </div>
      {/*welcome para*/}
      <div className='home-welcome-para'>
           <div className='head-welcome'>  Welcome   </div>
           <span> Your summer house awaits. Book now today!</span>
           <p>Welcome to our premier housing rental service in the vibrant city of Mumbai! Discover your ideal home amidst the bustling energy of this metropolis. 
            Our curated selection of rental properties offers a diverse range of options, from modern apartments to charming houses, ensuring you find a space that suits your lifestyle. 
            Experience the convenience of city living with our thoughtfully chosen accommodations. Whether you seek a cozy apartment or a spacious house, we are here to assist you in finding the perfect home in the heart of Mumbai.
             Welcome to a hassle-free and comfortable living experience with our housing rental service.
           </p>
           <button role="button"
             onClick={()=>{navigate('/hsh/search')}}>
             <sapn className='text'> BOOK NOW </sapn> <span> Thanks!</span>  </button>
      </div>
      {/* player */}
      <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
      <div className="player-container">
        <div className='video-player'>
           <ReactPlayer 
             url='https://www.youtube.com/watch?v=Li4JWcXa1PA' 
             playing='true'
             muted='true'
             controls={false}
             width='550px'
             height='300px'/>
        </div>
        <div className="player-aminites">
          <div className="count1">
           <h1 className='c1'> {counterOn && <CountUp end={90} duration={5} />}% </h1>
             <span className='c2'>customer Retention</span>
          </div>
          <div className="count2">
        <h1 className='c1'>  {counterOn && <CountUp end={200} duration={5} />}+ </h1>
           <span className='c2'>New properties registered(this month)</span>
          </div>
        </div> 
      </div>
      </ScrollTrigger>
      {/*opacity-container */}
      <div className="half-opacity-container">
          <div className="left-opacity-container">
             <span>Property you won't find </span>
             <span>anywhere else.</span> 
             <p>Look at some of the newest property registered.</p>
            <div className="button-box">
               <button>Latest</button>
            </div>
          </div>

          <div className='centre-img'>
          <img src={circleImg} className='circle-opacity'/> 
          </div>
                 
      </div>  
      {/* Review Section */}
      <div className='review-box' >
         <div className="review-top">
            <span>Our Latest Tweets</span>
            <TwitterIcon className='chidyan'/>
         </div>
         <div className="review-bottom">
            <div className="reviews">
                <div className="tweet"
                  style={{backgroundColor: 'gray'}}>
                   <img src={pp1}/>  
                    <span>Posted by: Admin</span> 
                     <p>
                      "Discover the essence of Mumbai
                       living with HomeSweetHome-Estate!
                       🌆 Seamless rentals, unparalleled service,
                       and a journey to call your own. 🏡✨
                       #HomeSweetHomeEstate #MumbaiLiving #RealEstate"
                     </p>
                </div>
                <div className="tweet"
                  style={{backgroundColor: 'rgb(72, 72, 72)'}}>
                   <img src={pp2} style={{objectPosition: '76% 50%'}} />
                   <span>Posted by: Admin</span> 
                   <p>
                    "Embark on a captivating journey through
                     vibrant tapestry with HomeSweetHome-Estate!
                     🏡🌟 Experience flawless rentals, unmatched 
                     service, and the joy of finding your perfect space. 
                     🌇✨ #HomeSweetHomeEstate #RealEstateMagic"
                   </p>
                </div>
                <div className="tweet"
                  style={{backgroundColor: 'gray'}}>
                  <img src={pp3} alt="" />
                  <span>Posted by: Admin</span> 
                  <p>
                  "Dive into the joy of home ownership with HomeSweetHome-Estate!
                   🏡✨ Our seamless buying experience ensures every step
                   feels like a milestone. From dream to keys in hand!
                    🗝️🌟 #HomeSweetHomeEstate
                   #HomeOwnership "
                  </p>
                </div>
                <div className="tweet"
                  style={{backgroundColor: 'rgb(72, 72, 72)'}}>
                   <span className='tweet-sign'>Sign Up</span>
                   <span className='tweet-bottom'>For Free</span>
                   <span className='tweet-para'>Click below to register with us.</span>
                   <button onClick={handleClickOpen}>REGISTER</button>
                </div>
            </div>
         </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You are already a registered user."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go Back.</Button>
        </DialogActions>
      </Dialog>
   </div> 
  )
}

export default Home
