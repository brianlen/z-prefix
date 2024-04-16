import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetails({ user }) {
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // Add your fetch GET request to get the item details here
    // setItem with the fetched item data
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Add your fetch PATCH request to update the item here
    setIsEditing(false);
  };

  if (!item) return null;

  return (
    <div>
      <input type="text" value={item.item_name} readOnly={!isEditing} />
      <input type="text" value={item.description} readOnly={!isEditing} />
      <input type="number" value={item.quantity} readOnly={!isEditing} />
      {user && (isEditing ? <button onClick={handleSave}>Save</button> : <button onClick={handleEdit}>Edit</button>)}
    </div>
  );
}

export default ItemDetails;
