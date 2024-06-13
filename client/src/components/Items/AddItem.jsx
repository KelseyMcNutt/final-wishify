import React, { useState } from 'react';
import { createItem } from '../../Managers/itemManager';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';

function AddItem({loggedInUser}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [storeId, setStoreId] = useState('');
  const [inCart, setInCart] = useState(false);

  const navigate = useNavigate();

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
      navigate('/items'); // Redirect to the items list or wherever appropriate
    } catch (error) {
      console.error('Error creating item:', error);
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
        <Label>Store ID</Label>
        <Input type="number" value={storeId} onChange={(e) => setStoreId(e.target.value)} />
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
