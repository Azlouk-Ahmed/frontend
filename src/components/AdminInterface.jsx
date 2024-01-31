import axios from 'axios';
import React, { useState } from 'react';
import { motion } from "framer-motion";

function AdminInterface({...props}) {
    const { user, token } = props.auth;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [dateHired, setDateHired] = useState('');
    const [flightName, setFlightName] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const [validation, setValidation] = useState(null);
  
    const handleFlightNameChange = (e) => {
      setFlightName(e.target.value);
    };
  
    const handleRoleChange = (e) => {
      setRole(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          'http://localhost:5000/api/accounts/signup',
          {
            email,
            name,
            surname,
            password,
            dateHired,
            flightName,
            role,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log('Form submitted successfully:', response.data);
        setValidation('Form submitted successfully');
        setError("");
      } catch (error) {
        console.log('Error submitting form:',error);
        setError(error.response.data.error);
        setValidation("");
      }
    };

  return (
    <div className='centered-child m-t'>
      <motion.form animate={{x : 0}}  initial={{x: -500}} onSubmit={handleSubmit}>
        <img width={50} src="https://cdn.dribbble.com/users/2014359/screenshots/6008317/2.gif" />
        <div className="name--input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="name--input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="name--input">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="name--input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="name--input">
          <label htmlFor="dateHired">Date Hired</label>
          <input
            type="date"
            id="dateHired"
            value={dateHired}
            onChange={(e) => setDateHired(e.target.value)}
          />
        </div>

        <div className="name--input">
          <label htmlFor="flightName">Flight Name</label>
          <select
            id="flightName"
            value={flightName}
            onChange={handleFlightNameChange}
          >
            <option value="AirCanada">AirCanada</option>
            <option value="Delta">Delta</option>
            <option value="United">United</option>
          </select>
        </div>

        <div className="name--input">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="progPr">ProgPr</option>
          </select>
        </div>

        <button type="submit">Submit</button>
        {error&&<div className="error">{error}</div>}
        {validation&&<div className="validation">{validation}</div>}
      </motion.form>
    </div>
  );
}

export default AdminInterface;
