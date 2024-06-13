import React, { useEffect, useState } from 'react';
import { getAllItemsByUserId } from '../../Managers/itemManager';
import { useNavigate } from 'react-router-dom';

export const AllItems = ({ loggedInUser }) => 
 {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getAllItemsByUserId(loggedInUser.id);
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [loggedInUser]);

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleAddItemClick = () => {
    navigate('/items/new');
  };

  return (
    <div className="all-items">
      <h1>All Items</h1>
      <button onClick={handleAddItemClick}>Add Item</button>
      {items.map(item => (
        <img
          key={item.id}
          src={item.image}
          alt={item.name}
          onClick={() => handleItemClick(item.id)}
          style={{ cursor: 'pointer', margin: '10px' }}
        />
      ))}
    </div>
  );
}


