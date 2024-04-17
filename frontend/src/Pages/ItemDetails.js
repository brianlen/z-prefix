import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetails({ user }) {
    const navigate = useNavigate();
    const { item_id } = useParams();
    const [item, setItem] = useState([]);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState();
    const [isEditing, setIsEditing] = useState(false);


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
            .then(data => window.alert(data.message))
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
        return <>Loading...</>
    } else {

        return (
            <>

            <p>item_id: {item[0].item_id}</p>
            <p>user_id: {item[0].user_id}</p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Item name" value={itemName} onChange={(e) => { setItemName(e.target.value) }} readOnly={!isEditing} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} readOnly={!isEditing} />
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} readOnly={!isEditing} />

                {user && (isEditing ? <button onClick={(e) => handleSave(e)}>Save</button> : <button onClick={(e) => handleEdit(e)}>Edit</button>)}
                {user ? <button onClick={() => handleDelete(item[0])}>Delete</button> : <></>}
            </form>

            </>

        );
    }



}

export default ItemDetails;
