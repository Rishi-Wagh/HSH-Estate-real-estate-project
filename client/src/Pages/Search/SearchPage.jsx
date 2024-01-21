import { useEffect, useState } from 'react'
import './search.style.scss'
import { useNavigate } from 'react-router-dom';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SearchResultListing from './searchResultListing/SearchResultListing';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const SearchPage = () => {
const navigate = useNavigate();
const [loading , setLoading] = useState(false);
const [page , setPage] = useState(0);
const [listingData, setListingData] = useState();
const [sidebardata , setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  
if(listingData){
  console.log(listingData.length);
}
 

useEffect(() =>{
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm');
  const typeFromUrl = urlParams.get('type');
  const parkingFromUrl = urlParams.get('parking');
  const furnishedFromUrl = urlParams.get('furnished');
  const offerFromUrl = urlParams.get('offer');
  const sortFromUrl = urlParams.get('sort');
  const orderFromUrl = urlParams.get('order');

  if(
    searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl 
     ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl == 'true' ? true : false,
        furnished: furnishedFromUrl == 'true' ? true : false,
        offer: offerFromUrl == 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc'
      })
     }

     const fetchListing = async () =>{
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/home/all-listings/get?${searchQuery}&startIndex=${page}`);
      let data = await res.json();

      if(data || data.sucess !== false){
           setListingData(data);
           setLoading(false);
      }else{
        console.log('something went wrong');
        setLoading(false);
      }
     }

     fetchListing();

},[location.search , page]);

  const handleChange =(e) =>{
    if(e.target.id == 'all' || e.target.id == 'rent' || e.target.id == 'sell'){
      setSidebardata({
        ...sidebardata,
        type: e.target.id
      })
    }
    
    if(e.target.id == 'searchTerm'){
        setSidebardata({
          ...sidebardata,
          searchTerm: e.target.value
        })
      }

    if(e.target.id == 'parking' || e.target.id == 'furnished' || e.target.id == 'offer'){
      setSidebardata({
        ...sidebardata,
        [e.target.id] : e.target.checked || e.target.checked == 'true' ? true : false,
      })
    }

    if(e.target.name == 'sort_order'){
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({
        ...sidebardata,
        sort,
        order,
      })
    }   
  }

  const handleSubmit = (e) =>{
      e.preventDefault();
      const urlParams = new URLSearchParams();
      urlParams.set('searchTerm', sidebardata.searchTerm);
      urlParams.set('type', sidebardata.type);
      urlParams.set('offer', sidebardata.offer);
      urlParams.set('parking', sidebardata.parking);
      urlParams.set('furnished', sidebardata.furnished);
      urlParams.set('order', sidebardata.order);
      urlParams.set('sort', sidebardata.sort);
      const searchQuery = urlParams.toString();
      navigate(`/hsh/search?${searchQuery}`);
  }

  const handlePageNo = (e) => {
    if(e.target.id === 'left' && page !== 0){
       setPage(page - 6);
    }
    if(e.target.id === 'right' && listingData.length === 6){
      setPage(page + 6);
    }
  }

  return (
    <div className='search-container'>
        <div className='left-search'>
          <form action="">
            <div className="search-field">
                <label className='search-head'>Search Term :</label>
                <input type="text" className='search-input' id='searchTerm' onChange={handleChange} value={sidebardata.searchTerm}/>
            </div>
            <div className="search-type">
                <label className='search-head'>Type :</label>
                <div className="search-type-options">
                    <label className='type-lable'>Sell & Rent</label>
                    <input type="checkbox" id="all" className='type-check' checked={sidebardata.type === 'all'} onChange={handleChange}/>
                </div>
                <div className="search-type-options">
                    <label className='type-lable'>Rent</label>
                    <input type="checkbox" id="rent" className='type-check' checked={sidebardata.type === 'rent'} onChange={handleChange}/>
                </div>
                <div className="search-type-options">
                    <label className='type-lable'>Sell</label>
                    <input type="checkbox" id="sell" className='type-check' checked={sidebardata.type === 'sell'} onChange={handleChange}/>
                </div>
                <div className="search-type-options">
                    <label className='type-lable'>offer</label>
                    <input type="checkbox" id="offer"  className='type-check' checked={sidebardata.offer} onChange={handleChange}/>
                </div>
            </div>
        
            <div className="search-type">
                <label className='search-head'>Aminities :</label>
                <div className="search-type-options">
                    <label className='type-lable'>Parking</label>
                    <input type="checkbox" id="parking" className='type-check' onChange={handleChange} checked={sidebardata.parking}/>
                </div>
                <div className="search-type-options">
                    <label className='type-lable'>Furnished</label>
                    <input type="checkbox" id="furnished"  className='type-check' onChange={handleChange} checked={sidebardata.furnished}/>
                </div>
            </div>

            <div className="search-type" onChange={handleChange} defaultValue={'created_at_desc'}>
                <ImportExportIcon/>
                <label className='search-head'>Sort :</label>
                <select name="sort_order">
                   <option value="regularPrice_asc">Price low to high</option>
                   <option value="regularPrice_desc">Price hight to low</option>
                   <option value="createdAt_desc">Newest to Old</option>
                   <option value="createdAt_asc">Oldest to New</option>
                </select>
            </div>
            <div className="search-button-container">
              <button className='search-button' onClick={handleSubmit}> Search </button>
            </div>
          </form>
        </div>
        
        <div className="right-search">
          <div className="listing-result-head">
           <h1>Listing Results:</h1>
          </div>

          <div className="listing-result-body">
             {loading && <p>Loading Listings...</p>}
             {
              listingData ?
               listingData.map((list , i) =>(<SearchResultListing key={i} listings={list}/>)) 
               : <p>oops! No listing found</p>}
              {listingData && <div className="search-page-button">
                  <KeyboardDoubleArrowLeftIcon id='left' onClick={handlePageNo}/>
                  <KeyboardDoubleArrowRightIcon id='right' onClick={handlePageNo}/>
               </div>}
          </div>
        </div>
    </div>
  )
}

export default SearchPage