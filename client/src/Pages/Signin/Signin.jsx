import './signin.style.scss'
import React , {useState} from 'react';
import {Link , useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart , signInSuccess , signInFailure } from '../../redux/user/user.redux';
import Oauth from '../../components/Oauth/Oauth';


const Signin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading , error } = useSelector((state) => state.user);
  const [formData , setFormData ] = useState(
    { email: '', password: '' });

  const handleChange = ({target}) =>{   
    const { name , value} = target;
     setFormData(
     {...formData , [name] : value })  
  }

  const handleSubmit = async (e) =>{
      e.preventDefault();
    
      dispatch(signInStart());

      const res = await fetch('/api/auth/sign-in' , {
        method: 'POST',
        headers:{
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json();
      console.log(data); 

      if(data.sucess == false ){
        dispatch(signInFailure(data.message || data.error));
      } else {
       dispatch(signInSuccess(data));
         navigate('/');
      }    
  }

  return (
    <div > 
        <div className="signup-container">
         <span className='err'>{error}</span>
           <span className='tag'> Sign-In </span>
          <form onSubmit={handleSubmit} className='form-box'>
              
              <input type="email"
                    name='email' 
                    placeholder='email' 
                    className='input' 
                    onChange={handleChange}
              />
              <input type="password" 
                    name='password'
                    placeholder='password' 
                    className='input' 
                   onChange={handleChange}
              />
              <button className='btn' disabled={loading}>{loading ? 'loading...':'submit'}</button>
             <Oauth />
          </form>
          Dont have an account?<Link to={'/Sign-up'}><span>Sign-up</span></Link>
        </div>
    </div>
  )
}

export default Signin 