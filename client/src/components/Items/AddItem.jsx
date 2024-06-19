import React, { useState, useEffect } from 'react';
import { createItem } from '../../Managers/itemManager';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { addStore } from '../../Managers/storeManager';
import { getUserStores } from '../../Managers/storeManager';
import "./AddItem.css"

function AddItem({loggedInUser}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [storeId, setStoreId] = useState('');
  const [inCart, setInCart] = useState(false);
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const userStores = await getUserStores(loggedInUser.id);
        setStores(userStores);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    fetchStores();
  }, [loggedInUser.id]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      name,
      link,
      image,
      price,
      storeId,
      inCart
    };
    try {
      await createItem(newItem, loggedInUser.id);
      navigate('/items'); 
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  // const handleAddStore = async () => {
  //   try {
  //     const addedStore = await addStore({ name: newStore });
  //     setStores([...stores, addedStore]);
  //     setStoreId(addedStore.id);
  //     setNewStore('');
  //   } catch (error) {
  //     console.error('Error adding store:', error);
  //   }
  // };

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

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <h3>Add New Item</h3>
      <FormGroup>
        <Label>Name</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Link</Label>
        <Input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Image URL</Label>
        <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Price</Label>
        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Store</Label>
        <Input type="select" value={storeId} onChange={(e) => setStoreId(e.target.value)}>
          <option value="">Select Store</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>New Store</Label>
        <Input type="text" value={newStore} onChange={(e) => setNewStore(e.target.value)} />
        <Button onClick={handleAddStore}>Add Store</Button>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" checked={inCart} onChange={(e) => setInCart(e.target.checked)} />{' '}
          In Cart
        </Label>
      </FormGroup>
      <Button color="primary" onClick={handleSubmit}>Add Item</Button>
    </div>
  );
}

export default AddItem;
