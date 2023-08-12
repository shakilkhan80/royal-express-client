import React from 'react';
import Marquee from "react-fast-marquee";
import img from '../../../assets/partners/Bagdoom.jpg'
import img1 from '../../../assets/partners/Bata.jpg'
import img2 from '../../../assets/partners/Daraz.jpg'
import img3 from '../../../assets/partners/Othoba.jpg'
import img4 from '../../../assets/partners/Pickaboo.jpg'


const Partner = () => {
    return (
        <div className='my-32'> 
            <Marquee className='h-36'>
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
        </Marquee>
        </div>
    );
};

export default Partner;