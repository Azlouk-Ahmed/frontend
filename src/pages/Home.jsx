import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import UserInterface from '../components/UserInterface';
import AdminInterface from '../components/AdminInterface';
import ProgPnInterface from '../components/ProgPnInterface';

function Home({...props}) {
    const {user, token} = props.auth;

  return (
    <>
      <div>
        <Nav auth={props.auth}/>
      </div>
      {user.role==="user" && <UserInterface auth={props.auth}/>}
      {user.role==="admin" && <AdminInterface auth={props.auth}/>}
      {user.role==="prgPN" && <ProgPnInterface auth={props.auth}/>}
      
    </>
  );
}

export default Home;
