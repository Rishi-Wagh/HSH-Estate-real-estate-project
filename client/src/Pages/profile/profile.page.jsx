import React, { useState } from 'react'
import './profile.style.scss';
import UserListings from '../userListingTab/userListings';
import UpdateTab from '../updateTab/updateTab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { deleteUserFaliure, deleteUserSuccess } from '../../redux/user/user.redux';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open , setOpen] = useState(false);
  const { currentUser } = useSelector((state)=> state.user);
  const [updateState , setUpdateState] = useState(false);

  const handleUpdateState = ()=>{
    if(!updateState){
        setUpdateState(true)
    }else{
        setUpdateState(false) 
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async ()=>{

    try {
      const res = await fetch(`api/user/delete/${currentUser._id}` ,{
        method: 'DELETE'
      });

      const data = await res.json();
      if(data.sucess !== false){
       dispatch(deleteUserSuccess());
       setOpen(false);
       navigate('/hsh/sign-in')
      } 
    } catch (error) {
      dispatch(deleteUserFaliure(error.message));
    }
      
  }

  const handleSignOut = async () =>{
    try {
      
        dispatch(deleteUserSuccess());
        navigate('/hsh/sign-in')
      
    } catch (error) {
      dispatch(deleteUserFaliure(error.message));
    }
  }

  return (
    <div className='profile-container'>
        <div className="profile-box">
            <div className="profile-header">
                <div className="dark">
                   <p style={{marginTop: '0px', marginLeft: '87%'}}>sign_out</p> <ExitToAppIcon className='sign-out' onClick={handleSignOut}/>
                    <img src={currentUser.avtar} alt="" onClick={handleUpdateState}/>
                    <span > {currentUser.username}</span>
                </div>
                <div className="gray">
                    <button className='listing' onClick={ () => navigate('/hsh/create-listing')} >Listing +</button>
                    <button className='profile-btn' onClick={handleUpdateState}>update</button>
                    <button className='profile-btn'onClick={handleClickOpen}>delete</button>
                </div>
            </div>
            <div className="profile-bottom">
              {updateState ? <UpdateTab /> : <UserListings /> } 
            </div>
        </div>    

        {/*Dialog box*/}

        <Dialog
          open={open}
          onCLose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
           <DialogTitle id='alert-dialog-title'>
            {'Delete Your Account.'}
           </DialogTitle>
           <DialogContent>
             <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete your account permanently?
             </DialogContentText>
           </DialogContent>
           <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleDelete} autoFocus> Agree </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default ProfilePage