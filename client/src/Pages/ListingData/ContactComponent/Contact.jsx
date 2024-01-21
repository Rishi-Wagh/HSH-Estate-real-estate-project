import { useEffect, useState } from 'react'
import './Contact.style.scss'
import { Link } from 'react-router-dom';

const Contact = ({id}) => {
const [landlord , setLandlord] = useState({});
const [error , setError] = useState(null);
const [message , setMessage] = useState('');

useEffect(()=>{
const {contacter , propertyOwner} = id;

const fetchproperty = async () =>{
    try {
        const res = await fetch (`/api/listing/${contacter}?property=${propertyOwner}`);
        const data = await res.json();

        if(data.sucess === 'false'){
            setError(true)
        }else{
            setLandlord(data);
        }
    } catch (error) {
      setError(true);  
      console.log(error);
    }}
   fetchproperty();
},[]);

const handleMessage = (e) => {
  setMessage(e.target.value);
}


  return (
    <div className='contact-container'>
         <p>Contact <span className='contact-s1'>{landlord.name}</span> to enquire for the <span className='contact-s1'>{id.listingName}</span></p>
         <textarea 
            className='contact-msg'
            name="message"
            cols="30" rows="2" 
            placeholder='Enter your message...'
            onChange={handleMessage}
            value={message}
            >
         </textarea>
         <Link className='conatct-link'
         to={`mailto:${landlord.email}?subject=Regarding ${id.listingName}&body=${message}`}>
            Send Message
         </Link>

    </div>
  )
}

export default Contact