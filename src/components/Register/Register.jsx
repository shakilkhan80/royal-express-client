import { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { sendEmailVerification } from "firebase/auth";


const Register = () => {

    const { createUser, googleLogin } = useContext(AuthContext);



    const { register, handleSubmit, formState: { errors }, } = useForm()

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";


    const handleSignUp = (data) => {

        const name = data.name;
        const email = data.email;
        const password = data.password;
        const confirm = data.confirm;

        if (password !== confirm) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Password and confirm password do not match',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const user = {
            name,
            email,
            password,
            role: 'user'
        }


        createUser(data.email, data.password)
            .then(result => {
                emailVerification(result.user)
                saveUsers(user);
                navigate('/');

            })
            .catch(error => {
                console.log(error);
            })


        // form.reset();
    }

    const emailVerification = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result)
                alert('Check your Email and please confirm your email')
            })
    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedInUser = result.user;
                navigate(from, { replace: true });
                saveUsers(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }




    const saveUsers = (data) => {

        fetch(`http://localhost:5000/users?email=${data.email}`)
            .then(res => res.json())
            .then(users => {
                if (users.length > 0) {
                    alert('User Found')
                    console.log(users.length);
                }
                if (users.length < 1) {
                    const user = {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        role: 'admin',

                    };

                    axios.post('http://localhost:5000/users', user, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            if (response.data.acknowledged) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Your work has been saved',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            })
    }




    return (
        <section className='my-4 py-5 mx-auto w-25'>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Please Register</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleSignUp)} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name </span>


                                </label>
                                <input type="text" placeholder="Name"
                                    {...register("name", { required: true })} className="input input-bordered" />
                                {errors.name && <span>This field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email"
                                    {...register("email", { required: true })} className="input input-bordered" />
                                {errors.email && <span>This field is required</span>}
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" {...register("password", { required: true })} className="input input-bordered" />
                                {errors.password && <span>This field is required</span>}

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="confirm password" {...register("confirm", { required: true })} className="input input-bordered" />
                                {errors.confirm && <span>This field is required</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>


                            <div className="form-control mt-6">
                                <input type="submit" value="Register" className="btn btn-primary" />

                            </div>


                        </form>
                        <div className='text-center mx-auto'>Already have an account? <Link to="/login" className='text-red-400'>Login</Link></div>

                        <div className="flex justify-center items-center my-5 space-x-1">
                            <h5 className="">Login with ....   </h5>
                            <button className='btn btn-circle' onClick={handleGoogleLogin}>G</button>
                        </div>

                    </div>
                </div>
            </div>




        </section>
    );
};

export default Register;