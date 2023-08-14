import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';

import img1 from '../../../assets/courier ui/features 1.png';
import img2 from '../../../assets/courier ui/feature 2.png';
import img3 from '../../../assets/courier ui/feature 3.png';
import img4 from '../../../assets/courier ui/features 4.png';
import img5 from '../../../assets/courier ui/features 5.png';
import img6 from '../../../assets/courier ui/features 6.png';

const ServiceFeatures = () => {
    return (
        <section className="my-32 ">
            <SectionTitle 
                heading={"সার্ভিস সমূহ"}
            ></SectionTitle>

            <div className=' my-20 flex justify-center'>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src={img1} alt="" /></figure>
                    <div className="card-body">
                        <div className="mt-auto">
                            <h2 className="card-title">পার্সেল ডেলিভারি
                            </h2>
                            <p>ব্যক্তিগত, ছোট ব্যবসা এবং কর্পোরেটদের জন্য ফার্স্ট-মাইল পিকআপ এবং লাস্ট মাইল ডেলিভারি সেবা

                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src={img2} alt="" /></figure>
                    <div className="card-body">

                        <div className="mt-auto">
                            <h2 className="card-title">বাল্ক শিপমেন্ট
                            </h2>
                            <p>বড় আইটেম এবং বড় সংখ্যক ডেলিভারির বিশেষ সমাধান
                            </p>
                        </div>

                    </div>
                </div>

                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src={img3} alt="" /></figure>
                    <div className="card-body">
                        <div className="mt-auto">
                            <h2 className="card-title">লাইন হল
                            </h2>
                            <p>এফটিএল (পুরো ট্রাকলোড) ও এলটিএল (আংশিক ট্রাকলোড) সহ মালামাল পরিবহনের সকল সমাধান

                            </p>
                        </div>
                    </div>
                </div>

                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src={img4} alt="" /></figure>
                    <div className="card-body">
                        <div className="mt-auto">
                            <h2 className="card-title">ওয়্যারহাউজ

                            </h2>
                            <p>সংরক্ষন, বাছাই এবং প্রক্রিয়াজাতকরণের পরিপূর্ণ সমাধান

                            </p>
                        </div>
                    </div>
                </div>

                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src={img5} alt="" /></figure>
                    <div className="card-body">
                        <div className="mt-auto">
                            <h2 className="card-title">ট্রাক ভাড়া

                            </h2>
                            <p>খোলা ট্রাক এবং কাভার্ড ভ্যান দেশের যে কোন জায়গায় যে কোন সময়

                            </p>
                        </div>
                    </div>
                </div>

                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src={img6} alt="" /></figure>
                    <div className="card-body">
                        <div className="mt-auto">
                            <h2 className="card-title">লোড-আনলোড
                            </h2>
                            <p>ইন্ডাস্ট্রি-অনুযায়ী ফ্যাক্টরি, প্রজেক্ট এবং বন্দরগুলোতে লোডিং-আনলোডিংয়ের সুবিধা
                            </p>
                        </div>
                    </div>
                </div> */}
            </div>

        </section>
    );
};

export default ServiceFeatures;