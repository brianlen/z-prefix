import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';
import CreateItem from './Pages/CreateItem';
import Inventory from './Pages/Inventory';
import ItemDetails from './Pages/ItemDetails';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div>
        {user ? `Logged in as ${user.username}` : 'You are not logged in.'}

        <nav><ul>
          <Link to="/create_account">Create Account</Link>
          <Link to="/login">Login</Link>
          <Link to="/create_item">Create Item</Link>
          <Link to="/inventory">Inventory</Link>
        </ul></nav>


        <Routes>
          <Route path="/create_account" element={<CreateAccount setUser={setUser}/>} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/create_item" element={<CreateItem user={user}/>} />
          <Route path="/inventory" element={<Inventory user={user}/>} />
          <Route path="/inventory/item/:id" element={<ItemDetails user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
