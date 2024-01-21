import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthapp } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/user.redux';
import { useNavigate } from 'react-router-dom';

const Oauth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
     
    const handleGoogleAuth = async () =>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(googleAuthapp);
            const result = await signInWithPopup(auth , provider);

            const formData = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            }
            
            const res = await fetch('/api/auth/google' , {
                method: 'POST',
                headers:{
                  'content-type': 'application/json',
                },
                body: JSON.stringify(formData)
              })

            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.log('error ', error);
        }
    }

  return (
        <button  
          type='button' 
          className='btn-g'
          onClick={handleGoogleAuth} >
          continue with google..
        </button>
  )
}

export default Oauth