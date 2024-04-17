import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        // Add your fetch POST request to create a new item here
        fetch('http://localhost:8080/inventory/createItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(() => navigate('/inventory'))



    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button type="submit">Create Item</button>
        </form>
    );
}

export default CreateItem;
