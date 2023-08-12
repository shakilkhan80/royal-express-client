import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/courier ui/slide 1.png';
import img2 from '../../../assets/courier ui/slide 2.png';
import img3 from '../../../assets/courier ui/slide 3.png';
import img4 from '../../../assets/courier ui/slide 4.png';



const Banner = () => {
    return (
       <div className="w-3/4 mx-auto">
         <Carousel className="w-2/3 mx-auto">
                <div >
                    <img src={img1}  />
                    
                </div>
                <div>
                    <img src={img2} />
                    
                </div>
                <div>
                    <img src={img3} />
                    
                </div>
                <div>
                    <img src={img4} />
                    
                </div>
            </Carousel>
       </div>
    );
};

export default Banner;