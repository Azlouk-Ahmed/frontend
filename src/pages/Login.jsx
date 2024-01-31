import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Loading from '../components/Loading';

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/accounts/login', {
        email: email,
        password: password,
      });
      setLoading(false);
      localStorage.setItem('auth', JSON.stringify(response.data));
      console.log('Response:', response.data);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  return (
    <div className='centered-child'>
      <motion.form  animate={{y : 0}}  initial={{y: -200}} onSubmit={handleSubmit}>
        <div className="name--input">
          <label htmlFor="email">Email</label>
          <motion.input
            type="text"
            animate={{opacity : 1}} initial={{opacity: -0}}
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            />
        </div>
        <div className="name--input">
          <label htmlFor="password">Password</label>
          <motion.input
            animate={{opacity : 1}} initial={{opacity: -0}}
            type="password"
            name="password"
            autoComplete='false'
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="input">
          {!loading && <button type="submit" className='login--btn' >Go In =&gt;</button>}
          {loading && <Loading />}
        </div>
        {
            error && <div className='error'><span>{error}</span><span>icon</span></div>
        }
      </motion.form>
      <img width={400} src="https://images.squarespace-cdn.com/content/v1/5769fc401b631bab1addb2ab/1541580611624-TE64QGKRJG8SWAIUS7NS/coding-freak.gif"/>
    </div>
  );
}

export default Login;
