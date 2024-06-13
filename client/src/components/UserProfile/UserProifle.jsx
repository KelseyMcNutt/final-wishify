import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfileAndCartItems } from '../../Managers/userManager';
import { Button } from 'reactstrap';
import { getUsersById } from '../../Managers/userManager';
import "./UserProfile.css"

const UserProfile = ({ loggedInUser }) => {
  const [profile, setProfile] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfileAndCartItems(loggedInUser.id).then(user => {
      setCartItems(user)
    getUsersById(loggedInUser.id).then(setProfile)

    })

    
  }, [loggedInUser]);

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  
  return (
    <div className="user-profile">
      <div className="profile-header">
        <Button onClick={() => navigate(-1)} className="back-button">Back</Button>
        <img src={profile.profileImage || 'default-avatar.png'} alt="User Profile" className="profile-image" />
        <div className="profile-details">
          <h1>{profile.firstName}</h1>
          <p>Budget: ${profile.monthlyBudget}</p>
          <Button onClick={() => navigate('/user-profile/edit')} className="edit-button">Edit</Button>
        </div>
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <div className="cart-items">
          {cartItems.map(item => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              onClick={() => handleItemClick(item.id)}
              className="cart-item"
            />
          ))}
        </div>
        <p>Total: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default UserProfile;
