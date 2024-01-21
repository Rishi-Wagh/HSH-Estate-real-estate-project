import './userListings.style.scss';
import React from 'react'
import { useEffect , useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserListings = () => {
  const navigate = useNavigate();
    const {currentUser} = useSelector((state) => state.user);
    const[pages, SetPages] = useState({});
    const[pageNo , setPageNO] = useState(1);
    const[userListings , SetUserListings] = useState([]);
    const[errMsg , SetErrMsg] = useState('');
    const[listingData , setListingData] = useState('');

    useEffect(()=>{
         const fetchUserListingsData = async () =>{
           try {
            const res = await fetch(`/api/user/listings/${currentUser._id}?page=${pageNo}&limit=3`);
            const data = await res.json();
            if(data.sucess == false){
               SetErrMsg(data.message);
            }else{
              let pageState = {};

              if(data.prevPage){
                pageState.prev = data.prevPage
              }

              if(data.nextPage){
                pageState.next = data.nextPage
              }
              if(data.result.length < 1){
                  setListingData('You have no Listings.')
              }
                SetPages(pageState);
                SetUserListings(data.result);
            }
           } catch (error) {
             SetErrMsg(error);
           }
         }
         fetchUserListingsData();
    },[pageNo])
   
    //Paging
    const handlePagination = (e) => {   
      if(e.target.name == 'prev'){
         setPageNO(pages.prev.page);
      }else{
        setPageNO(pages.next.page);
      }
    }
    
    //dleteing listing
    const handleDeleteListing = async (id) =>{
      try {
        const res = await fetch(`/api/user/delete/listing/${id}` ,{
          method: 'DELETE'
        });

        const data = await res.json();

        if(data.sucess == false){
          SetErrMsg(data.message);
        }else{
          window.location.reload();
          console.log(data);
        }
      } catch (error) {
        SetErrMsg(error);
      }
    }

  return (
    <div className='userListing-box'>
        <h1>
        Listings created by you.
        </h1>
        <div className="userListings-container">
        {
         listingData ? listingData : userListings.map((list) =>(
            <div className="userListing-card" key={list._id}>
               <div className="userListing-img">
                 <img src={list.imagesUrls[0]} />
               </div>
               <div className="userListing-info">
                  <span className='title'>{list.name}</span>
                  <span >property-type - <span className='type'>{list.type}</span></span>
                 <div className="buttons">
                   <button className='btn-1' onClick={()=>navigate(`/hsh/listingData/${list._id}`)}>Details</button>
                  <button className='btn-2' onClick={()=>handleDeleteListing(list._id)}>Delete</button>
                 </div>
               </div>
            </div>
            
         ))   
        }
        {pages.prev && <button name='prev' className='pag-btn' onClick={handlePagination} style={{marginBottom: '5px'}}>&lt;&lt; Prev</button> } {pages.next && <button name='next' className='pag-btn' onClick={handlePagination} style={{marginBottom: '5px'}}>Next &gt;&gt;</button>}
        </div>
   </div>
  )
}

export default UserListings