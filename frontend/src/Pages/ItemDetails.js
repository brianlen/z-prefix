import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetails({ user }) {
  const [item, setItem] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { item_id } = useParams();

  useEffect(() => {
    // Add your fetch GET request to get the item details here
    // setItem with the fetched item data
    fetch(`http://localhost:8080/inventory/item/${item_id}`)
      .then(response => response.json())
      .then(data => setItem(data));
  }, []);

  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Add your fetch PATCH request to update the item here
    setIsEditing(false);
  };

  if (item.length === 0) {
    return <>Loading...</>
  } else {

    return (
      <div>
        <input type="text" value={item[0].item_name} readOnly={!isEditing} />
        <input type="text" value={item[0].description} readOnly={!isEditing} />
        <input type="number" value={item[0].quantity} readOnly={!isEditing} />
        {user && (isEditing ? <button onClick={handleSave}>Save</button> : <button onClick={handleEdit}>Edit</button>)}
      </div>
    );
  }

  

}

export default ItemDetails;
