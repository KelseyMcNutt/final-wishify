import React, { useEffect, useState } from 'react';
import { getAllItemsByUserId } from '../../Managers/itemManager';
import { useNavigate } from 'react-router-dom';
import "./AllItems.css"
import { getUserStores } from '../../Managers/storeManager';

export const AllItems = ({ loggedInUser }) => 
 {
  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();


  if (!items) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getAllItemsByUserId(loggedInUser.id);
        const storesData = await getUserStores(loggedInUser.id);
        setItems(itemsData);
        setFilteredItems(itemsData);
        setStores(storesData);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };


  useEffect(() => {
    const filterItems = () => {
      let filtered = items;

      if (searchQuery) {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      if (selectedStore) {
        filtered = filtered.filter(item => item.storeId === parseInt(selectedStore));
      }

      if (selectedPriceRange) {
        filtered = filtered.filter(item => {
          const price = item.price;
          switch (selectedPriceRange) {
            case '0-30':
              return price >= 0 && price <= 30;
            case '30-60':
              return price > 30 && price <= 60;
            case '60-100':
              return price > 60 && price <= 100;
            case '100-200':
              return price > 100 && price <= 200;
            case '200+':
              return price > 200;
            default:
              return true;
          }
        });
      }

      setFilteredItems(filtered);
    };

    filterItems();
  }, [searchQuery, selectedStore, selectedPriceRange, items]);


  return (
   
    <div className='all-items-header'>
    <h1 className='all-items-header-h1'>All Items</h1>
    <div className='all-items-page'>
    <div className='filter-items'>
        <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className='search-input'
            />
        <select value={selectedStore} onChange={handleStoreChange} className='store-select'>
              <option value="">All Stores</option>
              {stores.map(store => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
            <select value={selectedPriceRange} onChange={handlePriceRangeChange} className='price-select'>
              <option value="">All Prices</option>
              <option value="0-30">$0 - $30</option>
              <option value="30-60">$30 - $60</option>
              <option value="60-100">$60 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200+">$200+</option>
            </select>
            <button onClick={handleAddItemClick} className='add-item-button'>Add Item</button>
    </div>
    </div>

    <div className="all-items">
        <div className='one-item'>
        {filteredItems.map(item => (
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            onClick={() => handleItemClick(item.id)}
            style={{ cursor: 'pointer', margin: '10px' }}
          />
        ))}
        </div>
    </div>
    </div>
  );
}


