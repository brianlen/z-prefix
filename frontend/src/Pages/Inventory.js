import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Inventory({ user }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Add your fetch GET request to get all items here
    // setItems with the fetched items data
  }, []);

  const handleDelete = (id) => {
    // Add your fetch DELETE request to delete an item here
    // Update items state
  };

  const filteredItems = filter === 'all' ? items : items.filter(item => item.user_id === user.id);

  return (
    <div>
      <button onClick={() => setFilter('all')}>All Inventory</button>
      <button onClick={() => setFilter('mine')}>My Inventory</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user_id}</td>
              <td><Link to={`/inventory/item/${item.id}`}>{item.item_name}</Link></td>
              <td>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</td>
              <td>{item.quantity}</td>
              <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
