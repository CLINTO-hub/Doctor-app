import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import { authContext } from '../context/AuthContext.jsx';
import HashLoader from 'react-spinners/HashLoader.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmailError('Enter a proper email ID');
      } else {
        setEmailError('');
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data,
          token: result.token,
          role: result.role
        }
      });

      setLoading(false);
      toast.success(result.message);
      navigate('/home');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section className='px-5 lg:px-0'>
      <div className='w-full max-w-[700px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className='text-primaryColor '>Welcome</span> Back
        </h3>

        <form className='py-4 md:py-0' onSubmit={submitHandler}>
          <div className='mb-5'>
            <input
              type='email'
              placeholder='Enter your Email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
              required
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>
          <div className='mb-5'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
              required
            />
          </div>
          <div className='mt-7'>
            <button disabled={loading} type='submit' className='w-full bg-blue-600 hover:bg-blue-800 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
              {loading ? <HashLoader size={25} color='#fff' /> : 'Login'}
            </button>
          </div>

          <p className='mt-5 text-textColor text-center'>
            Don&apos;t have an account? <Link to='/Signup' className='text-blue-600'>Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
