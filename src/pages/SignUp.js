import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let baseURL = "https://atlaspark.netlify.app/";

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${baseURL}/signup`, { username, password });
            alert('User registered succesufully');
            navigate('/');
        } catch (error) {
            alert(error.response.data || 'Error registering user');
        }
    };

  return (
    <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <div>
            <input 
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
        </div>
        <div>
            <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUp