import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='mx-auto text-center w-4/12 my-6'>
            <p className='font-bold'>{subHeading}</p>
            <h2 className='font-bold text-4xl uppercase border-y-4 py-4 '>{heading}</h2>
        </div>
    );
};

export default SectionTitle;