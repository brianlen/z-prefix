import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import bcrypt from 'bcryptjs';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();

      const requestBody = {
          username: username,
          password: password
      }

      // fetch POST to compare password with the encryptedPassword
      fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
      })
          .then(response => response.json())
          .then(userData => setUser(userData))
          .then(() => navigate('/inventory'))
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
