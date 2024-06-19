import React, { useEffect, useState } from 'react';
import { getItemDetailsById, updateItemDetails } from '../../Managers/itemManager';
import { useNavigate, useParams } from 'react-router-dom';
import { addStore } from '../../Managers/storeManager';
import { getUserStores } from '../../Managers/storeManager';
import "./EditItem.css"
import { Button, FormGroup, Input, Label , Form} from 'reactstrap';

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
    const addedStore = await addedStoreResponse.json(); 

   
    const updatedStores = [...stores, addedStore];
    setStores(updatedStores);

    
    setItem(prevItem => ({
      ...prevItem,
      storeId: addedStore.id
    }));

    
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
    <Form onSubmit={handleSubmit}>
    <FormGroup className='edit-item-form'>
      <h2>Edit Item</h2>
    <FormGroup >
      <FormGroup className='edit-name'>
        <Label>Name:</Label>
        <Input type="text" name="name" value={item.name} onChange={handleChange} />
      </FormGroup>
      <FormGroup className='edit-link'>
        <Label>Link:</Label>
        <Input type="text" name="link" value={item.link} onChange={handleChange} />
      </FormGroup>
      <FormGroup className='edit-image'>
        <Label>Image:</Label>
        <Input type="text" name="image" value={item.image} onChange={handleChange} />
      </FormGroup>
      <FormGroup className='edit-price'>
        <Label>Price:</Label>
        <Input type="number" name="price" value={item.price} onChange={handleChange} />
      </FormGroup>
      <FormGroup className='edit-store'>
        <Label>Store:</Label>
        <Input  type="select" name="storeId" value={item.storeId} onChange={handleChange}>
          <option value="">Select Store</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup className='edit-new-store'>
        <Label>New Store:</Label>
        <Input type="text" value={newStore} onChange={(e) => setNewStore(e.target.value)} />
        <Button type="button" onClick={handleAddStore}>Add Store</Button>
      </FormGroup>
      <FormGroup className='edit-cart-bool'>
        <Label>In Cart:</Label>
        <Input type="checkbox" name="inCart" checked={item.inCart} onChange={() => setItem({ ...item, inCart: !item.inCart })} />
      </FormGroup>
      <Button type="submit">Save</Button>
    </FormGroup>
    </FormGroup>
    </Form>
  );
}

export default EditItem;
