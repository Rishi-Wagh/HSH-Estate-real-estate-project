import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ImgSlider from './imgSlider/imgSlider';
import PropertyDes from './propertyDes/propertyDes';
import {useSelector} from 'react-redux';
import Contact from './ContactComponent/Contact';


const ListingData = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const params = useParams();
  const [err , setErr] = useState(false);
  const [listData , setListData] = useState(null);
  const [contactClicked , setContactClicked] = useState(false); 
  
  useEffect( () => {
    const fetchingListingData = async () =>{

    try {
        const res = await fetch(`/api/listing/data/${params.id}`);
        const data = await res.json();
        
        if(data.sucess == false){
          setErr(true)
        }else{
          setListData(data);
          setErr(false);
        }
  
     } catch (error) {
        setErr(true);
     }}
    fetchingListingData();
  },[]);

  const handleContactClick = () =>{
      setContactClicked(true);
  }

  return (
    <div style={{margin: '20px 20px'}}>
        {err ? <h1>"something went wrong!"</h1> : 
          listData ? <div> 
            <div style={{
            width: '80%',
            aspectRatio: '10/4',
            margin: '0 auto',
            }}>  
               <ImgSlider images={listData[0].imagesUrls}/> 
           </div>
          <div>
            < PropertyDes propData={listData[0]}/>
          </div>
          {!currentUser || currentUser._id !== listData[0].userRef && 
          <div className="contact">
          { (currentUser && !contactClicked) ?
           <button 
            onClick={handleContactClick} 
            style={{
              width: '85%',
              marginLeft: '8%',
              border: '1px solid aqua',
              color: 'white',
              fontWeight: '600',
              padding: '10px 20px',
              borderRadius: '30px',
              fontSize: '1.3rem',
              background: 'rgb(0,93,81)',
              background: 'linear-gradient(90deg, rgba(0,93,81,1) 0%, rgba(43,183,174,0.9248949579831933) 100%)'
            }}>
            Contact the property</button> 
           : <Contact 
            id={{"propertyOwner": listData[0].userRef , 
           "contacter": currentUser._id , 
           "contacter-email": currentUser.email  , 
           "listingName": listData[0].name}} /> }
           </div>
           }
          </div>
       : '' }
    </div>
  )
}

export default ListingData