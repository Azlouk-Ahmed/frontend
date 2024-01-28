import React from 'react'
import { CiUser } from "react-icons/ci";
import { MdFlightTakeoff } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Nav({...props}) {
    const {user, token} = props.auth
    console.log(user,"* ",token);
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('auth');
      navigate('/login');
      window.location.reload();
    };
  return (
    <nav>
        <div className="logo">
            <img src="img/logo.png" alt="" />
            TunisAir
        </div>
        <ul className='user--info'>
            <li><CiUser />{user.role==="prgPN" && <img className="admin" src="/img/progpn.png"/>}{user.role==="admin" && <img className="admin" src="/img/admin.png"/>} {user.name} {user.surname}</li>
            <li><MdFlightTakeoff /> {user.flightName}</li>
            <li><MdEventAvailable />
nombre conge disponible {user.nbrCong}</li>
        </ul>
        <button onClick={handleLogout}>logout</button>
    </nav>
  )
}

export default Nav