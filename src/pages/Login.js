import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:5000/login', [username, password]);
      alert('Login Successful');
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch(error) {
      alert(error.response.data || 'Error Logging in')
    }
  };
  
  return (
    <form onSubmit={handleLogin}>
      <h2>Sign In</h2>
      <div>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  )
}

export default Login;