import React, { useContext } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';




const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        navigate(from, { replace: true })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logged in successfully',
          showConfirmButton: false,
          timer: 1500
        })

      })
      .catch(error => {
        console.log(error);
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
            name: data.displayName,
            name: data.name,
            email: data.email,
            password: data.password,
            role: 'user',

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
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" name='password' placeholder="password" className="input input-bordered" required />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>

              <div className='text-center mx-auto'>Don't have an account? <Link to="/register" className='text-red-400'>Register</Link></div>

              <div className="flex justify-center items-center my-5 space-x-1">
                <h5 className="">Login with ....   </h5>
                <button className='btn btn-circle' onClick={handleGoogleLogin}>G</button>
              </div>
            </form>
          </div>
        </div>
      </div>





    </section>
  );
};

export default Login;