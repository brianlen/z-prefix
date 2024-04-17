import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';
import CreateItem from './Pages/CreateItem';
import Inventory from './Pages/Inventory';
import ItemDetails from './Pages/ItemDetails';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleLogout = (event) => {
    event.preventDefault();
    if (window.confirm(`${user.first_name}, are you sure you want to log out?`)) {
      setUser(null);
      navigate('/inventory');
    };
  }

  return (
    <div>
      <h1>Inventory Database Manager</h1>
      {user ?
        <div>
          {`Logged in as ${user.username}. Welcome ${user.first_name} ${user.last_name}. Your user_id is ${user.user_id}. `}
          <button onClick={(e) => handleLogout(e)}>Log out</button>
        </div>
        :
        <div>{'You are not logged in. '}<button><Link to="/login">Login</Link></button></div>
      }

      <nav><ul>
        <li><Link to="/create_account">Create Account</Link></li>
        <li><Link to="/login">Login</Link></li>
        {user ? <li><Link to="/create_item">Create Item</Link></li> : null}
        <li><Link to="/inventory">Inventory</Link></li>
      </ul></nav>


      <Routes>
        <Route path="/create_account" element={<CreateAccount setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/create_item" element={<CreateItem user={user} />} />
        <Route path="/inventory" element={<Inventory user={user} />} />
        <Route path="/inventory/item/:item_id" element={<ItemDetails user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
