import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProgPnInterface({...props}) {
  const { user, token } = props.auth;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/conge', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAccept = async (_id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/user/conge/accept/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData(); 
    } catch (error) {
      console.error('Error accepting:', error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/conge/decline/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); 
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className='centered-child'>
      {data.length>0 && <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>nombre conge</th>
            <th>Type</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Motif</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.user.name} {item.user.surname}</td>
              <td>{item.user.nbrCong}</td>
              <td>{item.type}</td>
              <td>{(item.dateDebut).slice(0,10)}</td>
              <td>{(item.dateFin).slice(0,10)}</td>
              <td>{item.motif}</td>
              <td>
                <button onClick={() => handleAccept(item._id)}>Accept ~</button>|| 
                <button onClick={() => handleDelete(item._id)}>Delete X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
      {data.length === 0 && <h3>no conge requests</h3>}
    </div>
  );
}

export default ProgPnInterface;
