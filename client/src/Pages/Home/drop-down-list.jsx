import React from 'react'
import { Link } from 'react-router-dom'

const Dropdownlist = () => {
  return (
    <div 
     style={{
     backgroundColor: 'rgb(250 , 250 , 250)' ,
     position: 'absolute' ,
     width: '150px',
     border: '1px solid rgb(240 , 240 , 240)',
     marginTop: '25px' ,
     cursor: 'pointer'}}>
        <li 
          style={{borderBottom: '1px solid white' ,
           padding: '10px' ,
            }}>
            <Link 
              to={'/hsh/search?searchTerm=&type=rent&offer=false&parking=false&furnished=false&order=desc&sort=createdAt'}
              style={{all: 'unset' ,
               color: 'black' ,
               }}
               >RENT</Link>
        </li>
        <li
          style={{padding: '10px'}}>
            <Link 
               to={'/hsh/search?searchTerm=&type=sell&offer=false&parking=false&furnished=false&order=desc&sort=createdAt'}
               style={{all: 'unset' ,
               color: 'black' ,
               }}>SELL</Link>
        </li>
    </div>
  )
}

export default Dropdownlist