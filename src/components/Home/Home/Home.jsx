import React from 'react';
import Banner from '../Banner/Banner'
import ServiceFeatures from '../ServiceFeatures/ServiceFeatures';
import CalculatePricing from '../CalculatePricing/CalculatePricing';
import Partner from '../Partner/Partner';
import About from '../About/About';
import { useLoaderData } from 'react-router-dom';
import Tracking from '../Tracking/Tracking';


const Home = () => {
    const allAreas = useLoaderData();
    const allLocationName = allAreas;
    return (
        <div>
            <Banner></Banner>
            <Tracking></Tracking>
            <ServiceFeatures></ServiceFeatures>
            <CalculatePricing allLocationName={allLocationName}></CalculatePricing>
            <Partner></Partner>
            <About></About>
            
            
        </div>
    );
};

export default Home;