import React, { useState } from 'react';
import './imgSlider.style.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import Brightness1Icon from '@mui/icons-material/Brightness1';

const ImgSlider = ({images}) => {
    const [index , setIndex] = useState(0);

  const handleprev = () =>{
        if(index == 0){
         setIndex(images.length - 1);
        }else{
         setIndex(index - 1);
        }
    }

 const handlenext = () =>{
        if(index == images.length - 1){
             setIndex(0);
        }else{
             setIndex(index + 1);
        }
    }


  return (
    <div className='img-slider-container'>
        <div className="img-slider">
         {images.map((img , i)=>(
            <img src={img} key={i} className='img-slider-img' style={{translate: `${-100 * index}%` }}/>))} 
        </div>
        <button onClick={handleprev} className='slider-left-btn'> <ArrowCircleLeftIcon /> </button>  
        <button onClick={handlenext} className='slider-right-btn'> <ArrowCircleRightIcon /> </button>    
        <div className="img-slider-dots">
        {images.map((_, i) => (
           <button key={i}
               className='img-slider-dot-btn' 
               onClick={()=>{setIndex(i)}}>
                {i === index ? <TripOriginIcon /> : <Brightness1Icon />} 
           </button>
         ))}
       </div>
    </div>
  )
}

export default ImgSlider