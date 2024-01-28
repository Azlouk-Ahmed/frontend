import { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'

function App() {
  const [auth, setAuth] = useState(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    return storedAuth || null;
  });
  useEffect(() => {
    // You can keep this logic if you want to update the auth state based on local storage changes
    // const storedAuth = JSON.parse(localStorage.getItem('auth'));
    // setAuth(storedAuth || null);
  }, []);
  return (
    <div className="App">
      {/* <Login /> */}
      <BrowserRouter>
        <Routes>
        <Route path='/' element={auth ? <Home auth={auth}/> : <Navigate to="/login" />} />
        <Route path='/login' element={!auth ? <Login /> : <Navigate to="/" />} />
        </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
