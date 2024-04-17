import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';
import CreateItem from './Pages/CreateItem';
import Inventory from './Pages/Inventory';
import ItemDetails from './Pages/ItemDetails';

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <div>
        {user ? 
        `Logged in as ${user.username}. Welcome ${user.first_name} ${user.last_name}. Your user_id is ${user.user_id}.` 
        : 'You are not logged in.'}

        <button onClick={() => setUser(null)}>Log out</button>

        <nav><ul>
          <li><Link to="/create_account">Create Account</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/create_item">Create Item</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
        </ul></nav>


        <Routes>
          <Route path="/create_account" element={<CreateAccount setUser={setUser}/>} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/create_item" element={<CreateItem user={user}/>} />
          <Route path="/inventory" element={<Inventory user={user}/>} />
          <Route path="/inventory/item/:item_id" element={<ItemDetails user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
