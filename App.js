import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        setToken(token);
        setMessage('');
      }
    } catch (error) {
      setMessage('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setToken('');
  };

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { message } = response.data;
        setMessage(message);
      }
    } catch (error) {
      setMessage('Access denied.');
    }
  };

  return (
    <div className="App">
      <h1>JWT Authentication Example</h1>
      {!token ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <h2>Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
          <p>{message}</p>
          <button onClick={fetchDashboardData}>Fetch Dashboard Data</button>
        </div>
      )}
    </div>
  );
};

export default App;