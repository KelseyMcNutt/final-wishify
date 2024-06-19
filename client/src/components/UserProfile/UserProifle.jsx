import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfileAndCartItems } from '../../Managers/userManager';
import { Button } from 'reactstrap';
import { getUsersById } from '../../Managers/userManager';
import "./UserProfile.css"
import { IoArrowBackSharp, IoPencil } from "react-icons/io5";
import { logout } from '../../Managers/authManager';
import { IoColorPaletteSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";


const UserProfile = ({ loggedInUser, setLoggedInUser }) => {
  const [profile, setProfile] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
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
    <div className='container-user'>
    <div className="user-profile">
      <div className="profile-header">
        <Button onClick={() => navigate("/")} className="back-button"><IoArrowBackSharp size={30} color='black'/></Button>
        <img src={profile.profileImage || 'default-avatar.png'} alt="User Profile" className="profile-image" />
        <div className="profile-details">
          <h1>{profile.firstName} {profile.lastName}</h1>
          <p>Budget: ${profile.monthlyBudget}</p>
          <Button onClick={() => navigate('/user-profile/edit')} className="edit-button"><IoPencil /></Button>
          <Button
              color="white"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                  navigate("/login")
                });
              }}
            >
             <LuLogOut size={30}  color='black' className='logout-icon'/>
            </Button>
            <Button
              color="secondary"
              onClick={() => navigate('/color-picker')}
              className="color-picker-button"
            >
              <IoColorPaletteSharp className="color-icon" color='black' size={30} />

            </Button>
        </div>
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <p className='total-price'>Total: ${totalPrice}</p>
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
        
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
