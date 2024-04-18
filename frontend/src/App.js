import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';
import CreateItem from './Pages/CreateItem';
import Inventory from './Pages/Inventory';
import ItemDetails from './Pages/ItemDetails';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

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

            <AppBar position="static">
                <Toolbar>
                    <ListAltRoundedIcon style={{ marginRight: '10px' }} />
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Inventory Manager
                    </Typography>

                    <Button color="inherit" onClick={() => navigate("/create_account")}>Create Account</Button>
                    <Button color="inherit" onClick={() => navigate("/inventory")}>Inventory</Button>
                    {user ? <Button color="inherit" onClick={(e) => handleLogout(e)}>Logout</Button> : <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>}
                </Toolbar>
            </AppBar>


            {user ?
                <div style={{color: 'white'}}>
                    {`Logged in as ${user.username}. Welcome ${user.first_name} ${user.last_name}. Your user_id is ${user.user_id}. `}
                </div>
                :
                <div style={{color: 'white'}}>{'You are not logged in. '}</div>
            }



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



// <h1>Inventory Database Manager</h1>
// {user ?
//     <div>
//         {`Logged in as ${user.username}. Welcome ${user.first_name} ${user.last_name}. Your user_id is ${user.user_id}. `}
//         <button onClick={(e) => handleLogout(e)}>Log out</button>
//     </div>
//     :
//     <div>{'You are not logged in. '}<button><Link to="/login">Login</Link></button></div>
// }

// <nav><ul>
//     <li><Link to="/create_account">Create Account</Link></li>
//     <li><Link to="/login">Login</Link></li>
//     {user ? <li><Link to="/create_item">Create Item</Link></li> : null}
//     <li><Link to="/inventory">Inventory</Link></li>
// </ul></nav>



export default App;
