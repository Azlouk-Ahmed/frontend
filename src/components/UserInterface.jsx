import React, { useState } from 'react';
import axios from 'axios';

function UserInterface({...props}) {
    const {user, token} = props.auth;
    console.log("token;",token);
    const [formData, setFormData] = useState({
        type: '',
        dateDebut: '',
        dateFin: '',
        motif: ''
      });
    
    
      const [error, setError] = useState("");
      const [validation, setValidation] = useState("");
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        const response = await axios.post('http://localhost:5000/api/user/conge', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
          console.log('Server response:', response.data);
          setValidation(response.data.mssg);
          setError("");
    
          setFormData({
            type: '',
            motif: '',
            dateDebut: '',
            dateFin: ''
          });
    
          setError(false);
        } catch (error) {
          console.error('Error submitting form:', error.response.data.error);
          setError(error.response.data.error);
          setValidation("")
        }
      };
  return (
    <div>
        <div className="centered-child m-t">
        <form onSubmit={handleSubmit}>
          <div className="name--input ">
            <label htmlFor="type">type</label>
            <input
              type="text"
              id="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          <div className="name--input">
            <label htmlFor="motif">motif</label>
            <input
              type="text"
              id="motif"
              value={formData.motif}
              onChange={handleChange}
            />
          </div>
          <div className="name--input">
            <label htmlFor="dateDeb">date deb</label>
            <input
              type="date"
              id="dateDebut"
              value={formData.dateDebut}
              onChange={handleChange}
            />
          </div>
          <div className="name--input">
            <label htmlFor="dateFin">date fin</label>
            <input
              type="date"
              id="dateFin"
              value={formData.dateFin}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <button type="submit" className="login--btn">
              submit demand =&gt;
            </button>
          </div>
          {error && (
            <div className="error">
              <span>{error}</span>
              <span>icon</span>
            </div>
          )}
          {validation && (
            <div className="validation">
              <span>{validation}</span>
              <span>icon</span>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default UserInterface