import './updateTab.style.scss';
import React ,{ useRef , useState , useEffect}  from 'react'
import { updateUserStart , updateUserSuccess , updateUserFailure } from '../../redux/user/user.redux';
import { getDownloadURL, getStorage , ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { googleAuthapp } from '../../firebase';

const UpdateTab = () => {
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=>state.user);

    const [photo , setPhoto] = useState();
    const [formData , setFormData] = useState({});
    const [uploadError , setUploadError] = useState(null); 
    const [progessPercentage , setProgressPercentage ] = useState(0); 

    useEffect(()=>{
        if(photo){
            handlePhotoUpload();
        }   
    },[photo]);

    const handlePhotoUpload = () =>{
        const photoName = new Date().getTime() + photo.name;
        const storage = getStorage(googleAuthapp);
        const storageRef = ref(storage , photoName);
        const uploadTask = uploadBytesResumable(storageRef , photo);
        
        uploadTask.on('state_changed',
           (snapshot) =>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressPercentage(Math.round(progress));
           },
       
           (error)=>{
            setUploadError(true);
            },
           ()=>{
             getDownloadURL(uploadTask.snapshot.ref).then
              ((downloadURL) =>{
                setFormData({
                    ...formData,
                    avtar: downloadURL })
                })
              })
    }

    const handleFormData = (e) =>{
       const {name , value} = e.target;

       setFormData({
        ...formData,
        [name]: value
       })
    }

    const handleUpdate = async (e)=>{
        e.preventDefault();

            dispatch(updateUserStart());

            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers:{
                   'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if(data.sucess == false){
                dispatch(updateUserFailure(data.message || data.error));
            }else{
                dispatch(updateUserSuccess(data));
                console.log(data);
            }
    }

  return (
    <div className='update-container'>
       <form onSubmit={handleUpdate} className='update-box' >
        <h1>Update</h1>
          <input
              ref={fileRef}
              type="file" 
              hidden
              accept='image/.*'
              onChange={(e)=>setPhoto(e.target.files[0])}
              />
          <img 
              className='update-img'
              src={currentUser.avtar} 
              onClick={()=>fileRef.current.click()} />
             {progessPercentage > 0 && progessPercentage < 100 && <p>uploading...{progessPercentage}%</p>}
             {progessPercentage == 100 && <p>uploaded Successfully!</p> } 
          <input 
              className='update-input'
              type="text" 
              placeholder='username'
              name='username'
              defaultValue={currentUser.username}
              onChange={handleFormData}
               />
          <input 
              className='update-input'
              type="text" 
              placeholder='email'
              name='email'
              defaultValue={currentUser.email}
              onChange={handleFormData}
               />
          <input 
              className='update-input'
              type="password" 
              placeholder='password'
              name='password'
              defaultValue={currentUser.password}
              onChange={handleFormData}
               />
          <button className='update-btn'>update</button>
       </form>
    </div>
  )
}

export default UpdateTab