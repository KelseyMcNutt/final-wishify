import React, { useEffect, useState } from 'react';
import { getItemDetailsById } from '../../Managers/itemManager';
import { useParams } from 'react-router-dom';

function ItemDetails() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemDetails = await getItemDetailsById(parseInt(itemId));
        setItem(itemDetails);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>; // You can show a loading indicator while fetching data
  }

  return (
    <div className="item-details">
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.name} />
      <p>Price: ${item.price}</p>
      <p>Link: <a href={item.link}>{item.link}</a></p>
      <p>Store: {item.store.name}</p>
    </div>
  );
}

export default ItemDetails;
