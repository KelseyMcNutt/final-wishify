import React, { useEffect, useState } from 'react';
import { getItemDetailsById, updateItemDetails } from '../../Managers/itemManager';
import { useNavigate, useParams } from 'react-router-dom';
import { addStore } from '../../Managers/storeManager';
import { getUserStores } from '../../Managers/storeManager';

function EditItem({loggedInUser}) {
  const [item, setItem] = useState({
    name: '',
    link: '',
    image: '',
    price: 0,
    storeId: '',
    inCart: false
  });
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState('');
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


  const fetchStores = async () => {
    try {
      const userStores = await getUserStores(loggedInUser.id);
      setStores(userStores);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  fetchItemDetails();
  fetchStores();
}, [itemId, loggedInUser.id]);


const handleAddStore = async () => {
  try {
    const addedStoreResponse = await addStore({ name: newStore });
    const addedStore = await addedStoreResponse.json(); // Parse JSON response

    // Update stores list
    const updatedStores = [...stores, addedStore];
    setStores(updatedStores);

    // Update item with new store ID
    setItem(prevItem => ({
      ...prevItem,
      storeId: addedStore.id
    }));

    // Clear newStore input
    setNewStore('');
  } catch (error) {
    console.error('Error adding store:', error);
  }
};



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
        <label>Store</label>
        <select name="storeId" value={item.storeId} onChange={handleChange}>
          <option value="">Select Store</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>New Store:</label>
        <input type="text" value={newStore} onChange={(e) => setNewStore(e.target.value)} />
        <button type="button" onClick={handleAddStore}>Add Store</button>
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
