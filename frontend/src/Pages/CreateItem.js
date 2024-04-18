import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


function CreateItem({ user }) {
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            user_id: parseInt(user.user_id),
            item_name: itemName,
            description: description,
            quantity: quantity
        };

        // POST into the server and database
        fetch('http://localhost:8080/inventory/createItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(() => navigate('/inventory'))
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '50vh' }}
                spacing={2}
            >
                <Grid item><Button variant="contained" color="primary" onClick={() => navigate('/inventory')}>Back</Button></Grid>
                <Grid item><TextField type="text" label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} /></Grid>
                <Grid item><TextField type="text" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} /></Grid>
                <Grid item><TextField type="number" label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></Grid>
                <Grid item><Button variant="contained" color="primary" type="submit">Create Item</Button></Grid>
            </Grid>
        </Box>
    );
}

export default CreateItem;
