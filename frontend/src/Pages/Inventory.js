import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import LoginIcon from '@mui/icons-material/Login';


function Inventory({ user }) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/inventory')
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);


    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };


    const handleDelete = (item) => {
        if (window.confirm(`${user.first_name}, are you sure you want to delete item ${item.item_name}?`)) {
            fetch(`http://localhost:8080/inventory/item/${item.item_id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setItems(items.filter(element => element.item_id !== item.item_id));
                    }
                })
        } else {
            return;
        }
    };

    // filter using "My Inventory" button
    let filteredItems = filter === 'all' ? items : items.filter(item => item.user_id === user.user_id);

    // filter again based on textfield
    filteredItems = filteredItems.filter(item => 
        item.item_id.toString().includes(filterText.toLowerCase()) || 
        item.username.toLowerCase().includes(filterText.toLowerCase()) || 
        item.item_name.toLowerCase().includes(filterText.toLowerCase()) || 
        item.description.toLowerCase().includes(filterText.toLowerCase())
    );



    return (
        <div>
            <Box mt={2}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                // style={{ minHeight: '50vh' }}
            >

                <Box mb={2}>
                    {user ?
                        <>
                            <Button variant="contained" color="primary" onClick={() => setFilter('all')} style={{ marginRight: '10px' }} ><WbSunnyIcon style={{marginRight:'5px'}}/>All Inventory</Button>
                            <Button variant="contained" color="primary" onClick={() => setFilter('mine')} style={{ marginRight: '10px' }} ><WbIncandescentIcon style={{marginRight:'5px'}}/>My Inventory</Button>
                            <Button variant="contained" color="primary" onClick={() => navigate('/create_item')} style={{marginRight:'10px'}}><AddBoxIcon style={{marginRight:'5px'}}/>Create Item</Button>
                            <TextField autoComplete='off' label="Filter" variant="outlined" onChange={handleFilterChange} size='small' />
                        </> : <Button variant="contained" color="primary" onClick={() => navigate('/login')}><LoginIcon/>Login</Button>
                    }
                </Box>

                <Box style={{ width: '90vw', margin: 'auto auto' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item ID</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredItems.map(item => (
                                    <TableRow key={item.item_id}>
                                        <TableCell>{item.item_id}</TableCell>
                                        <TableCell>{item.username}</TableCell>
                                        <TableCell>{<Button variant="contained" sx={{ color: 'white', backgroundColor: 'primary', borderColor: 'black' }} onClick={() => navigate(`/inventory/item/${item.item_id}`)}>{item.item_name}</Button>}</TableCell>
                                        <TableCell>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{user ? <Button variant="contained" sx={{ color: 'white', backgroundColor: 'red', borderColor: 'black' }} onClick={() => handleDelete(item)}><DeleteIcon/></Button> : null}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>
            </Box>
        </div>
    );




}

export default Inventory;
