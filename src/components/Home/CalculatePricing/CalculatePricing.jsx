import React, { useState } from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

const CalculatePricing = () => {
    const { register, handleSubmit, errors } = useForm();
    const [calculationResult, setCalculationResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleCalculation = (data) => {
        if (data && data.kg) {
            const kg = parseFloat(data.kg); 
            const result = 44 + (15 * kg);
            setCalculationResult(result);
            setShowResult(true);
        } else {
            console.error("Form data or kg property is undefined");
        }
    };

    const handleReset = () => {
        reset();
        setShowResult(false);
        setCalculationResult(null);
    };

    return (
        <section>
        <div className="hero py-11 bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Calculate Pricing</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                        a id nisi.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleCalculation)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">পণ্যের ওজন ( সর্বোচ্চ 10 কেজি ) </span>
                            </label>
                            <input type="text" placeholder="KG" {...register("kg", { required: true })} className="input input-bordered" />
                        </div>
                        
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Calculate</button>
                            {showResult && <div className="mt-4 text-3xl font-bold">Delivery fee: {calculationResult} Tk</div>}
                            <button type="button" className="btn btn-secondary mt-4 " onClick={handleReset}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    );
};

export default CalculatePricing;
