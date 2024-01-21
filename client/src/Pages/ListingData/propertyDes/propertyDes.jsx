import './propertyDes.style.scss';
import HouseTwoToneIcon from '@mui/icons-material/HouseTwoTone';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalHotelTwoToneIcon from '@mui/icons-material/LocalHotelTwoTone';
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import ChairTwoToneIcon from '@mui/icons-material/ChairTwoTone';
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';

const PropertyDes = ({propData}) => {
  return (
    <div className='prop-detail-contaner'>
        <div className='prop-title'>
         <h1>{propData.name}</h1>
        </div>
        <div className="prop-type-and-price">
          <div className="prop-type">
            <HouseTwoToneIcon className={propData.type === 'sell'? 'sell-icon' : 'rent-icon'}/>
            {propData.type === 'sell' ? <span>For Sell</span> : <span>For Rent</span>}
          </div>
          <div className="prop-regular-price">
            <span className='regular-tag'>Regular Price </span>
            <span className='regular-num'>Rs. {propData.regularPrice}/-</span>
          </div>
          {propData.discountedPrice > 0 ? <div className="prop-discount-price">
            <span className='discount-tag'>*offer price </span>
            <span className='discount-num'>Rs. {propData.discountedPrice}/-</span>  
          </div> : <div className="prop-discount-price">
            <span className='discount-tag'>*offer price</span>
            <NotInterestedTwoToneIcon className='discount-icon'/>
          </div> }
        </div>
        <div className='prop-description'>
          <h3>Property Description</h3>
          <span>{propData.description}</span>
        </div>
        <div className="prop-address">
            <LocationOnTwoToneIcon />
            <span>{propData.adress}</span>
        </div>

        <div className="prop-amenities">
          <div className="prop-amenities-card">
            <div className="aminities-left">
               <KeyTwoToneIcon className='aminity-icon'/>
            </div>
            <div className="aminites-right">
               <span className='aminity-status-result'>Immediately</span>
               <span className='aminity-status'>Possesion</span>
            </div>
          </div>
          <div className="prop-amenities-card">
            <div className="aminities-left">
               <PeopleAltOutlinedIcon className='aminity-icon'/>
            </div>
            <div className="aminites-right">
               <span className='aminity-status-result'>Family , Bachelors</span>
               <span className='aminity-status'>Prefered Tenents</span>
            </div>
          </div>
          <div className="prop-amenities-card">
            <div className="aminities-left">
               <ChairTwoToneIcon className='aminity-icon'/>
            </div>
            <div className="aminites-right">
               <span className='aminity-status-result'>{propData.furnished ? 'furnished' : 'not-furnished'}</span>
               <span className='aminity-status'>Furniture</span>
            </div>
          </div>
          <div className="prop-amenities-card">
            <div className="aminities-left">
               <LocalHotelTwoToneIcon className='aminity-icon'/>
            </div>
            <div className="aminites-right">
               <span className='aminity-status-result'>{propData.bedrooms}</span>
               <span className='aminity-status'>No. of Bedrooms</span>
            </div>
          </div>
          <div className="prop-amenities-card">
            <div className="aminities-left">
               <BathtubTwoToneIcon className='aminity-icon'/>
            </div>
            <div className="aminites-right">
               <span className='aminity-status-result'>{propData.bathrooms}</span>
               <span className='aminity-status'>No. of Bathrooms</span>
            </div>
          </div>
          <div className="prop-amenities-card">
            <div className="aminities-left">
               <DirectionsCarFilledOutlinedIcon className='aminity-icon'/>
            </div>
            <div className="aminites-right">
               <span className='aminity-status-result'>{propData.parking ? 'Available': 'not-available'}</span>
               <span className='aminity-status'>Parking</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PropertyDes