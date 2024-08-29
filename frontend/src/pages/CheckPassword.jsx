import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';

const CheckPassword = () => {
  const [data, setData] = useState({ password: '' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/email');
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await axios.post('http://localhost:3000/api/password/checkPassword', {password:data.password,userId:location.state._id});

      if (res.data.success) {
        toast.success(res.data.message);
        window.localStorage.getItem('token',res.data.token)
        setData({ password: '' });
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
      console.log(error);
    }
  };

  // Render nothing if location.state is not available
  if (!location.state) return null;

  console.log(data)
  console.log(location.state._id);
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 md:mx-auto'>
        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          <Avatar width={70} height={70} name={location.state.name} imageUrl={location.state.profile_pic} />
          <h2 className='font-semibold text-lg'>{location.state.name}</h2>
        </div>
        <h3>Welcome to Chat app!</h3>
        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              onChange={handleChange}
              value={data.password}
              required
            />
          </div>
          <button
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >Login</button>
        </form>
        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forget Password ?</Link></p>
      </div>
    </div>
  );
};

export default CheckPassword;
