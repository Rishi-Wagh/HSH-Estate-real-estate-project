import { Link } from 'react-router-dom';
import './searchResultListing.style.scss';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const SearchResultListing = ({listings}) => {
    
  return (
    <>
    <Link to={`/hsh/listingData/${listings._id}`} style={{all: 'unset'}}>
    <div className='SearchResultListing-card'>
        <img src={listings.imagesUrls[0]} />
        <h3>{listings.name}</h3>
        <h6> <LocationOnOutlinedIcon style={{fontSize: '17px'}}/> {listings.adress}</h6>
        <h4>Price : {listings.regularPrice}/-</h4>        
    </div>
    </Link>
    </>
    
  )
}

export default SearchResultListing