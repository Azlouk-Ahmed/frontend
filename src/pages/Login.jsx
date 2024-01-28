import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
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
      const response = await axios.post('http://localhost:5000/api/accounts/login', {
        email: email,
        password: password,
      });
      localStorage.setItem('auth', JSON.stringify(response.data));
      console.log('Response:', response.data);
      navigate("/");
      window.location.reload();
    } catch (error) {
        setError(error.response.data.error);
    }
  };

  return (
    <div className='centered-child'>
      <form onSubmit={handleSubmit}>
        <div className="name--input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="name--input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="input">
          <button type="submit" className='login--btn' >Go In =&gt;</button>
        </div>
        {
            error && <div className='error'><span>{error}</span><span>icon</span></div>
        }
      </form>
    </div>
  );
}

export default Login;
