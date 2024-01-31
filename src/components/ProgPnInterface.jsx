import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import Loading from './Loading';
import emailjs from 'emailjs-com';

function ProgPnInterface({...props}) {
  const { user, token } = props.auth;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);


  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/user/conge', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleAccept = async (_id,userEmail) => {
    try {
      setLoadingAccept(true);
      await axios.delete(
        `http://localhost:5000/api/user/conge/accept/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        emailjs.send("service_gct59da", "template_p4bogh4", {
          message: "votre conge est accepté",
          email: userEmail,
          }, 'uzK508LS6nIkpPVW1')
          .then((result) => {
            console.log(result);
          }, (error) => {
            console.log(error.text);
        });
      setLoadingAccept(false);
      fetchData(); 
    } catch (error) {
      console.error('Error accepting:', error);
      setLoadingAccept(false);
    }
  };

  const handleDelete = async (_id,userEmail) => {
    try {
      setLoadingDelete(true)
      await axios.delete(`http://localhost:5000/api/user/conge/decline/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadingDelete(false);
      emailjs.send("service_gct59da", "template_p4bogh4", {
        message: "votre conge n'est pas accepté",
        email: userEmail,
        }, 'uzK508LS6nIkpPVW1')
        .then((result) => {
          console.log(result);
        }, (error) => {
          console.log(error.text);
      });
      fetchData(); 
    } catch (error) {
      setLoadingDelete(false)
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className='centered-child'>
      {!loading && <motion.table animate={{x : 0}}  initial={{x: -500}}>
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
                <span>
                <button onClick={() => handleAccept(item._id,item.user.email)}>Accept ~</button>|| 
                <button onClick={() => handleDelete(item._id,item.user.email)}>Delete X</button>

                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>}
      {loading && <Loading />}
    </div>
  );
}

export default ProgPnInterface;
