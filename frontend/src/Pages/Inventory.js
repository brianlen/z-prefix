import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

function Inventory({ user }) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetch('http://localhost:8080/inventory')
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

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

    const filteredItems = filter === 'all' ? items : items.filter(item => item.user_id === user.user_id);

    return (
        <div>
            {user ?
                <>
                    <Button variant="contained" color="primary" onClick={() => setFilter('all')}>All Inventory</Button>
                    <Button variant="contained" color="primary" onClick={() => setFilter('mine')}>My Inventory</Button>
                </> : null
            }

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
                                <TableCell>{user ? <Button variant="contained" sx={{ color: 'white', backgroundColor: 'red', borderColor: 'black' }} onClick={() => handleDelete(item)}>Delete</Button> : null}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );




}

export default Inventory;
