import './signup.style.scss'
import React , {useState} from 'react';
import {Link , useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart , signInSuccess , signInFailure } from '../../redux/user/user.redux';
import Oauth from '../../components/Oauth/Oauth';


const Sigup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading , error } = useSelector((state) => state.user);
  const [formData , setFormData ] = useState(
    { username: '', email: '', password: '' });

  const handleChange = ({target}) =>{   
    const { name , value} = target;
     setFormData(
     {...formData , [name] : value })  
  }

  const handleSubmit = async (e) =>{
      e.preventDefault();
      
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-up' , {
        method: 'POST',
        headers:{
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json();
     
      if(data.sucess == false){
        dispatch(signInFailure(data.message || data.error));
      }else{
        dispatch(signInSuccess(data));
         navigate('/Sign-in');
      }
  }

  return (
    <div > 
        <div className="signup-container">
          <span className='err'>{error}</span>``
           <span className='tag'> Sign-Up </span>
          <form onSubmit={handleSubmit} className='form-box'>
              <input type="text" 
                   name='username' 
                   placeholder='username' 
                   className='input' 
                   onChange={handleChange}
              />
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
              <button className='btn' disabled={loading}>{ loading ? 'loading..': 'submit' }</button>
              <Oauth  />
          </form>
          Already a user?<Link to={'/hsh/Sign-in'}><span>log-in</span></Link>
        </div>
    </div>
  )
}

export default Sigup
