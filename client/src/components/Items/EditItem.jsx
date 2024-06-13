import React, { useEffect, useState } from 'react';
import { getItemDetailsById, updateItemDetails } from '../../Managers/itemManager';
import { useNavigate, useParams } from 'react-router-dom';

function EditItem() {
  const [item, setItem] = useState({
    name: '',
    link: '',
    image: '',
    price: 0,
    storeId: '',
    inCart: false
  });
  const { itemId } = useParams();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItemDetails(itemId, item);
      navigate(`/item/${itemId}`);
    } catch (error) {
      console.error('Error updating item details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={item.name} onChange={handleChange} />
      </div>
      <div>
        <label>Link:</label>
        <input type="text" name="link" value={item.link} onChange={handleChange} />
      </div>
      <div>
        <label>Image:</label>
        <input type="text" name="image" value={item.image} onChange={handleChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={item.price} onChange={handleChange} />
      </div>
      <div>
        <label>Store ID:</label>
        <input type="text" name="storeId" value={item.storeId} onChange={handleChange} />
      </div>
      <div>
        <label>In Cart:</label>
        <input type="checkbox" name="inCart" checked={item.inCart} onChange={() => setItem({ ...item, inCart: !item.inCart })} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default EditItem;
