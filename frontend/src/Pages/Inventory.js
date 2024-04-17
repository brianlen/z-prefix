import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Inventory({ user }) {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Add your fetch GET request to get all items here
        fetch('http://localhost:8080/inventory')
            .then(response => response.json())
            .then(data => setItems(data));

        // setItems with the fetched items data
    }, []);

    const handleDelete = (item) => {
        if (window.confirm(`Are you sure you want to delete item ${item.description}?`)) {
            fetch(`http://localhost:8080/inventory/item/${item.item_id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        // Update the items state to remove the deleted item
                        setItems(items.filter(element => element.item_id !== item.item_id));
                    }
                })
        }
    };

    const filteredItems = filter === 'all' ? items : items.filter(item => item.user_id === user.user_id);

    return (
        <div>
            <button onClick={() => setFilter('all')}>All Inventory</button>
            <button onClick={() => setFilter('mine')}>My Inventory</button>
            <table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>User ID</th>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item.item_id}>
                            <td>{item.item_id}</td>
                            <td>{item.user_id}</td>
                            <td><Link to={`/inventory/item/${item.item_id}`}>{item.item_name}</Link></td>
                            <td>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</td>
                            <td>{item.quantity}</td>
                            <td><button onClick={() => handleDelete(item)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Inventory;
