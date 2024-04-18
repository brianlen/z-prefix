import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Account from './Pages/Account';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';
import CreateItem from './Pages/CreateItem';
import Inventory from './Pages/Inventory';
import ItemDetails from './Pages/ItemDetails';

// Misc MUI imports
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

// imports for AppBar
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState();


    const [open, setOpen] = useState(false);

    const handleClickOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = (event) => {
        event.preventDefault();
        setOpen(false);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        // if (window.confirm(`${user.first_name}, are you sure you want to log out?`)) {
            setOpen(false);
            setUser(null);
            navigate('/inventory');
        // };
    }

    return (
        <div>

            <AppBar position="static">
                <Toolbar>
                    <ListAltRoundedIcon style={{ marginRight: '10px' }} />
                    <Typography variant="h6" onClick={() => navigate("/inventory")} style={{ flexGrow: 1 }}>Inventory Manager</Typography>

                    {user ? <Button color="inherit" onClick={() => navigate("/account")}><AccountBoxIcon/>{user.username}</Button> : null}
                    <Button color="inherit" onClick={() => navigate("/create_account")}><GroupAddIcon style={{marginRight:'3px'}}/>Create Account</Button>
                    <Button color="inherit" onClick={() => navigate("/inventory")}><ListAltRoundedIcon/>Inventory</Button>
                    {user ? <Button color="inherit" onClick={(e) => handleClickOpen(e)}><LogoutIcon/>Logout</Button> : <Button color="inherit" onClick={() => navigate("/login")}><LoginIcon/>Login</Button>}
                </Toolbar>
            </AppBar>





            <Dialog
                open={open}
                onClose={(e) => handleClose(e)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {user && `${user.first_name}, are you sure you want to log out?`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={(e) => handleClose(e)} color="primary">Cancel</Button>
                    <Button onClick={(e) => handleLogout(e)} color="primary" autoFocus>Logout</Button>
                </DialogActions>
            </Dialog>





            <Routes>
                <Route exact path="/" element={<Login setUser={setUser}/>}></Route>
                <Route path="/account" element={<Account user={user} />} />
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
