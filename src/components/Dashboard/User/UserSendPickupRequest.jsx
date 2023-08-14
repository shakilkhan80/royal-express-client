import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Select from 'react-select';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';



const UserSendPickupRequest = () => {
    const { user } = useContext(AuthContext);

    const allLocationName = useLoaderData();
    const [selectedPickupOption, setSelectedPickupOption] = useState(null);
    const [selectedDroppingOption, setSelectedDroppingOption] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm()


    // const selectFromDistrict = [
    //     { value: 'Dhaka', label: 'Dhaka' }
    // ]
    // const selectToDistrict = [
    //     { value: 'Dhaka', label: 'Dhaka' }
    // ]

    // const pickupOptions = allLocationName.map(location => {
    //     const option = {
    //         value: location._id,
    //         label: location.location
    //     };
    //     return option;
    // });

    // const droppingOptions = allLocationName?.map(location => {
    //     const option = {
    //         value: location._id,
    //         label: location.location
    //     };
    //     return option;
    // });



    // const handlePickupOptionChange = (selectedOption) => {
    //     setSelectedPickupOption(selectedOption);
    //     console.log('Selected pickup option:', selectedOption);
    // };
    // const handleDroppingOptionChange = (selectedOption) => {
    //     setSelectedDroppingOption(selectedOption);
    // };


    const onSubmit = (data) => {


        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);

        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }



        const fromName = data.fromName;
        const fromAddress = data.fromAddress;
        const fromNumber = data.fromNumber;
        const kg = parseFloat(data.kg);
        const toName = data.toName;
        const toAddress = data.toAddress;
        const toNumber = data.toNumber;
        const price = 44 + (15 * kg);
        const email = user.email;
        


        const order = {
            fromName,
            fromAddress,
            fromNumber,
            kg,
            district: 'dhaka',
            toName,
            toAddress,
            toNumber,
            pick: selectedPickupOption.label,
            drop: selectedDroppingOption.label,
            date: formattedDate,
            status: 'Order Placed',
            price,
            date: formattedDate,
            email,
        }
        console.log(order);



        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())

            .then((data) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your pickup request has been placed',
                    showConfirmButton: false,
                    timer: 1500
                  })
                reset();
            })
            .catch((error) => {
                console.error(error);
            });


    }



    return (
        <section className='my-4 py-5 mx-auto w-full'>

            <div className="hero min-h-screen">
                <div className=" flex-col w-full ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold my-10 text-center">PickUp Request</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                        <div className='flex justify-end'>
                            <button
                                className="btn btn-error mt-6 w-20 me-8 "
                                onClick={() => reset()}
                            >
                                Reset Form
                            </button>
                        </div>
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex gap-10 justify-around'>
                                <div className='w-full'>
                                    <div><h1 className='text-2xl font-bold'>From</h1>
                                    </div>

                                    {/* <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">District</span>
                                        </label>
                                        <Select options={selectFromDistrict} 
                                        {...register("districtFrom", {
                                            required: " This field is required"
                                        })} />
                                    {errors.districtFrom && <span className="text-error">{errors.districtFrom.message}</span>}
                                    </div> */}


                                   
                                    {/* <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">পিক-আপের এলাকা নির্বাচন করুন</span>
                                        </label>
                                        <Select
                                            options={pickupOptions}
                                            onChange={handlePickupOptionChange}
                                            value={selectedPickupOption}
                                            {...register("pickupArea", {
                                                required: "পিক-আপের এলাকা অবশ্যই নির্বাচন করতে হবে"
                                            })} />
                                        {errors.pickupArea && <span className="text-error">{errors.pickupArea.message}</span>}

                                    </div> */}

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name </span>
                                        </label>
                                        <input type="text" placeholder="Type Person/Company Name"
                                            {...register("fromName", { required: true, setValueAs: (value) => value.toUpperCase() })} className="input input-bordered" />
                                        {errors.fromName && <span className='text-error'>This field is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Address</span>
                                        </label>
                                        <input type="text" placeholder="Address"
                                            {...register("fromAddress", { required: true })} className="input input-bordered h-24" />
                                        {errors.fromAddress && <span className='text-error'>This field is required</span>}
                                    </div>


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone number</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type 11 digit phone no."
                                            {...register("fromNumber", {
                                                required: true,
                                                pattern: {
                                                    value: /^\d{11}$/, // Regular expression for exactly 11 digits
                                                    message: "Phone number must be 11 digits"
                                                }
                                            })}
                                            className="input input-bordered"
                                        />
                                        {errors.fromNumber && <span className="text-error">{errors.fromNumber.message}</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">পণ্যের ওজন ( সর্বোচ্চ 10 কেজি ) </span>
                                        </label>
                                        <input
                                            type="number"  // Use type="number" to ensure numeric input
                                            placeholder="KG"
                                            {...register("kg", {
                                                required: true,
                                                max: {
                                                    value: 10,
                                                    message: "মান 10 এর বেশি হতে পারবে না" // Custom error message
                                                }
                                            })}
                                            className="input input-bordered"
                                        />
                                        {errors.kg && <span className="text-error">{errors.kg.message}</span>}
                                    </div>
                                </div>

                                

                                {/* ...........................................to............................................................................. */}


                                <div className='w-full'>
                                    <div><h1 className='text-2xl font-bold'>To</h1>
                                    </div>

                                    {/* <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">District</span>
                                        </label>
                                        <Select options={selectToDistrict}
                                            {...register("districtTo", {
                                                required: " This field is required"
                                            })} />
                                        {errors.districtTo && <span className="text-error">{errors.districtTo.message}</span>}

                                    </div> */}


                                    {/* <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">ডেলিভারি এলাকা নির্বাচন করুন</span>
                                        </label>
                                        <Select
                                            options={droppingOptions}
                                            onChange={handleDroppingOptionChange}
                                            value={selectedDroppingOption}
                                            {...register("deliveryArea", {
                                                required: "ডেলিভারি এলাকা অবশ্যই নির্বাচন করতে হবে"
                                            })}
                                        />
                                        {errors.deliveryArea && <span className="text-error">{errors.deliveryArea.message}</span>}

                                    </div> */}

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name </span>
                                        </label>
                                        <input type="text" placeholder="Type Person/Company Name"
                                            {...register("toName", { required: true, setValueAs: (value) => value.toUpperCase() })} className="input input-bordered" />
                                        {errors.toName && <span className='text-error'>This field is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Address</span>
                                        </label>
                                        <input type="text" placeholder="Address"
                                            {...register("toAddress", { required: true })} className="input input-bordered h-24" />
                                        {errors.toAddress && <span className='text-error'>This field is required</span>}
                                    </div>


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone number</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type 11 digit phone n0."
                                            {...register("toNumber", {
                                                required: true,
                                                pattern: {
                                                    value: /^\d{11}$/, // Regular expression for exactly 11 digits
                                                    message: "Phone number must be 11 digits"
                                                }
                                            })}
                                            className="input input-bordered"
                                        />
                                        {errors.toNumber && <span className="text-error">{errors.fromNumber.message}</span>}
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-end'>
                                <input type="submit" value="Submit" className="btn btn-primary" />
                            </div>

                        </form>



                    </div>
                </div>
            </div>




        </section>
    );
};

export default UserSendPickupRequest;