import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Header from './components/Navigation/Header'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Sigup from './Pages/Sigup/Sigup'
import Signin from './Pages/Signin/Signin'
import PrivateRoute from './components/privateRoute'
import ProfilePage from './Pages/profile/profile.page'
import Listing from './Pages/Listing/Listing'
import UpdateListing from './Pages/updateListing/updateListing'
import ListingData from './Pages/ListingData/ListingData'
import SearchPage from './Pages/Search/SearchPage'
import HeaderHome from './components/Navigation/HeaderHomeComponent/HeaderHome'
const App = () => {
  return (
    <div>
         
            <Routes>
               <Route path='/' element={<HeaderHome />}>
                   <Route path='/' element={<Home />} /> 
               </Route>

                    <Route path='/hsh/' element={<Header />}>
                    <Route path='/hsh/About' element={<About />} /> 
                    <Route path='/hsh/Sign-Up' element={<Sigup />} /> 
                    <Route path='/hsh/Sign-in' element={<Signin />} />
                    <Route path='/hsh/listingData/:id'  element={<ListingData />} />
                    <Route path='/hsh/search' element={<SearchPage /> }/>
                        <Route  element={<PrivateRoute />} >
                        <Route path='/hsh/Profile' element={<ProfilePage />} /> 
                        <Route path='/hsh/create-listing' element={<Listing />}/>
                        </Route>
                    </Route>
                </Routes>
      
    </div>
  )
}

export default App
