import { useState } from 'react';
import './listing.style.scss';
import { getDownloadURL, getStorage, ref , uploadBytesResumable , deleteObject } from 'firebase/storage';
import { googleAuthapp } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

  const Listing = () => {
  const navigate = useNavigate();
  const {currentUser} = useSelector((state)=>state.user);
  const [loading , SetLoading] = useState(false);
  const [errMsg , setErrMsg ] = useState('');
  const [imgFiles , setImgFiles ] = useState([]);
  const [formData , setFormData] = useState(
   { imagesUrls: [], 
     name: '' ,  
     description: '', 
     adress: '' , 
     type: 'rent' , 
     regularPrice: 0 , 
     discountedPrice: 0 , 
     bedrooms: 0, 
     bathrooms: 0 , 
     furnished: false , 
     parking : false , 
     offer: false 
    })

 const handleImgFiles = (e) =>{
   setImgFiles(e.target.files);
 }

 const handleImgUpload = () =>{

  if(imgFiles.length > 0 && imgFiles.length < 7 && formData.imagesUrls.length < 7){
    const promises = [];

    for( let i=0; i<imgFiles.length; i++){
      promises.push(uploadimgFiles(imgFiles[i]));
    }
  
    Promise
     .all(promises)
     .then((url) => { 
      setFormData({...formData, imagesUrls:[...formData.imagesUrls ,...url]});
     })
     .then(() =>{
       SetLoading(false);
     })
     .catch((error) =>{
      setErrMsg('Image upload failed (max 2mb per img)');
      SetLoading(false);
     })

  }else{
      setErrMsg('Select only 6 images')
  }
 
 }

 const uploadimgFiles = async (imgFile) =>{
   return new Promise((resolve , reject) => {
     SetLoading(true);
     const imgFileName = new Date().getTime() + imgFile.name;
     const storage = getStorage(googleAuthapp);
     const storageRef = ref(storage , imgFileName);
     const uploadTask = uploadBytesResumable(storageRef , imgFile);

     uploadTask.on('state_changed',
     (snapshot) =>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(Math.round(progress));
     },
      (error) => {
        reject(error);
      },
      () =>{
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL)=>{
            resolve(downloadURL);
          })
      })
   })}

   const handleDeleteImg = (i , url) =>{
    let arr1 = formData.imagesUrls.slice(0,i);
    let arr2 = formData.imagesUrls.slice(i+1, formData.imagesUrls.length);

    setFormData({
      ...formData,
      imagesUrls: [...arr1 , ...arr2]
    })
   }

  const handleFormData = (e) => {
      if(e.target.name === 'sell' || e.target.name === 'rent'){
        setFormData({
          ...formData,
          type: e.target.name,
        })
      } 
      if(e.target.name === 'parking' || e.target.name === 'furnished' || e.target.name === 'offer'){
        setFormData({
          ...formData,
          [e.target.name]: e.target.checked
        })
      } 
      
      if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea' ){
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        })
      }
  }

  const handleSubmitFormData = async (e) =>{
    e.preventDefault();
    if( formData.name == '' ||  formData.description == '' || formData.adress == '') return setErrMsg(' Fill all the fields');
    if(+formData.regularPrice < +formData.discountedPrice) return setErrMsg('Discount Price cannot br more than Regular Price!');
    if(formData.imagesUrls.length === 0) return setErrMsg('Must upload atleast 1 image');

    try {
      SetLoading(true);

      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id
        })
      })

      const data = await res.json();
      if(data.sucess == false){
        SetLoading(false);
        setErrMsg(data.message);
      }else{
        SetLoading(false);
        console.log(data);
        navigate(`/hsh/listingData/${data._id}`);
      }

    } catch (error) {
      SetLoading(false);
      setErrMsg(error);
    }
  }

  return (
   
    <div className="listingPage-conatiner">
    <div className='Listing-page'>
        <div className="listing-container">
            <span className='heading'> <h1 style={{textShadow: '-1px 1px 0 #000, 5px 5px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000'}}>CREATE LISTING</h1> </span>
            <div className="listing-form">
               <form action="" onSubmit={handleSubmitFormData}>
                <div className="listForm-inputContainer">
                    <input type="text" name='name' placeholder='name (property title of the listing)' className='list-text'style={{height: '30px'}} value={formData.name} onChange={handleFormData}/>
                    <textarea name="description" id="" cols="50" rows="5" placeholder='description' className='list-text' onChange={handleFormData}/>
                    <textarea name='adress' cols="50" rows="5" placeholder='adress' className='list-text' value={formData.adress} onChange={handleFormData}/>
                </div>       
                <div className="listForm-checkboxContainer">
                     <div className="listing-checkbox">
                       <input type="checkbox" name="sell" onChange={handleFormData} checked={formData.type === 'sell'}/>
                        <span>Sell</span>
                     </div>
                     <div className="listing-checkbox">
                       <input type="checkbox" name="rent"  onChange={handleFormData} checked={formData.type === 'rent'}/>
                       <span>Rent</span>
                     </div>
                     <div className="listing-checkbox">
                       <input type="checkbox" name="parking"  onChange={handleFormData} checked={formData.parking}/>
                       <span>Parking</span>
                     </div>
                     <div className="listing-checkbox">
                       <input type="checkbox" name="furnished"  onChange={handleFormData} checked={formData.furnished}/>
                       <span>Furnished</span>
                     </div>
                     <div className="listing-checkbox">
                       <input type="checkbox" name="offer"  onChange={handleFormData} checked={formData.offer}/>
                       <span>Offer</span>
                     </div>                     
                </div>
                <div className="listForm-numInputContainer">
                    <div className="numLeft">
                    <div className="listing-leftNum">
                         <input type="number" name="bedrooms" min='1'  onChange={handleFormData}  value={formData.bedrooms}/>
                         <span>No of Bedrooms</span>
                       </div>
                       <div className="listing-leftNum">
                         <input type="number" name="bathrooms" min='1'  onChange={handleFormData}  value={formData.bathrooms}/>
                         <span>No of Bathrooms</span>
                       </div>
                    </div>
                     <div className="numRight">
                     <div className="listing-rightNum">
                         <input type="number" name="regularPrice" min='1'  onChange={handleFormData}  value={formData.regularPrice}/>
                         <div><p>Regular Price</p> <p className='lightshade'>-Rs/Months</p></div>
                       </div>
                       <div className="listing-rightNum">
                         <input type="number" name="discountedPrice"  onChange={handleFormData}  disabled={!formData.offer} value={formData.offer ? formData.discountedPrice : formData.regularPrice}/>
                         <div><p>Discounted Price</p> <p className='lightshade'>-Rs/Months</p></div>
                       </div>
                      </div>            
                 </div>
                 <div className="listform-imgConatiner">
                    <div className="listImg-top">
                      <p>Images: <span>First Image will be the cover image(max 6)</span></p>
                    </div>
                    <div className="listImg-bottom">
                      <input type="file" name="images" accept='image/*' multiple onChange={handleImgFiles}/>
                      <button type='button' onClick={handleImgUpload} disabled={loading}>{loading ? "uploading..." : "Upload"}</button>
                    </div>
                 </div> 
                    <button className='btn-listing'>{ loading ? "creating..." : "Create Listing" }</button>
                    {errMsg}
               </form>
          </div>
        </div>
    </div>
    <div className="uploaded-container">
           {formData.imagesUrls.length > 0            
               && formData.imagesUrls.map((url , i) => (
               <div className="uploaded-img" key={i} >
                  <img src={url} />
                  <button type='button' onClick={() => handleDeleteImg(i , url)}> delete </button>
               </div>
             ))
           }
        </div> 
  </div>  
  )
}

export default Listing