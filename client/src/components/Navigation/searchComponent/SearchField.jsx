import React, { useState , useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


const SearchField = () => {
    const navigate = useNavigate();
    const [ serachTerm , setSearchTerm ] = useState('');

    const handleChange = (e) =>{
       setSearchTerm(e.target.value);
    }

    const handleClick = (e) =>{  
     e.preventDefault();
     if(serachTerm){
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', serachTerm);
        const searchQuery = urlParams.toString();
        navigate(`/hsh/search?${searchQuery}`);
        }
    }

    useEffect(() =>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

  return (
    <div>
         <div className="searchfield">
           <input type="text" placeholder='What are you looking for?' style={{outline : 'none'}}
            onChange={handleChange} value={serachTerm} />
           <button 
            style={{borderTopRightRadius: '40px', 
               borderBottomRightRadius: '40px', 
               border: 'none',
               borderLeft: '2px solid gray',
               paddingLeft: '20px',
               cursor: 'pointer' }}>
               <SearchIcon  style={{paddingRight: '20px'}}
            onClick={handleClick} />
               </button> 
         </div>
    </div>
  )
}

export default SearchField;