import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';


function ItemDetails({ user }) {
    const navigate = useNavigate();
    const { item_id } = useParams();
    const [item, setItem] = useState([]);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState();
    const [isEditing, setIsEditing] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:8080/inventory/item/${item_id}`);
                const data = await response.json();
                setItem(data);
                setItemName(data[0].item_name);
                setDescription(data[0].description);
                setQuantity(data[0].quantity);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchItem();
    }, [item_id, isEditing]);


    // sets editing to true so that the input can be typed in
    const handleEdit = (event) => {
        event.preventDefault();
        setIsEditing(true);
    };

    // handles the save and fetching
    const handleSave = (event) => {
        event.preventDefault();

        const requestBody = {
            item_name: itemName,
            description: description,
            quantity: quantity,
        };

        fetch(`http://localhost:8080/inventory/item/${item_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    setIsEditing(false);
                    return response.json();
                } else {
                    console.error('Error updating item:', response.status, response.statusText);
                }
            })
            .then(data => {
                setAlertMessage(data.message);
                setAlertOpen(true);
            })
            .catch((error) => {
                console.error('Error updating item:', error);
            });
    };

    const handleDelete = (item) => {
        if (window.confirm(`${user.first_name}, are you sure you want to delete item ${item.item_name}?`)) {
            fetch(`http://localhost:8080/inventory/item/${item.item_id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        navigate('/inventory');
                    }
                })
        } else {
            return;
        }
    };






    if (item.length === 0) {
        return null;
    } else {

        return (
            <>
                {alertOpen && <Alert severity="success" onClose={() => setAlertOpen(false)}>{alertMessage}</Alert>}
     
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ minHeight: '80vh' }}
                >
                    <Box mb={2}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/inventory')} style={{ marginRight: '10px' }}><ArrowBackIcon/></Button>
                    </Box>

                    <Box mb={2}>
                        <TextField
                            type="text"
                            label="Item name"
                            value={itemName}
                            onChange={(e) => { setItemName(e.target.value) }}
                            style={{width: '15vw'}}
                            InputProps={{ readOnly: !isEditing }}
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            multiline
                            rows={6}
                            type="text"
                            label="Description"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            style={{width: '15vw'}}
                            InputProps={{readOnly: !isEditing }}
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            type="number"
                            label="Quantity"
                            value={quantity}
                            onChange={(e) => { setQuantity(e.target.value) }}
                            style={{width: '15vw'}}
                            InputProps={{ readOnly: !isEditing }}
                            inputProps={{min: 0}}
                        />
                    </Box>

                    <Box mb={2}>
                        {user && (isEditing ?
                            <Button variant="contained" color="primary" onClick={(e) => handleSave(e)} style={{ marginRight: '10px' }}><SaveIcon/>Save</Button> :
                            <Button variant="contained" color="primary" onClick={(e) => handleEdit(e)} style={{ marginRight: '10px' }}><EditIcon/>Edit</Button>
                        )}
                        {user &&
                            <Button variant="contained" sx={{ color: 'white', backgroundColor: 'red', borderColor: 'black' }} onClick={() => handleDelete(item[0])}><DeleteIcon/></Button>
                            
                        }
                    </Box>
                </Grid>


            </>

        );
    }



}

export default ItemDetails;
