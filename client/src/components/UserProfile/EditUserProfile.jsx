import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UpdateUser, getUsersById } from '../../Managers/userManager'; // Adjust the import path as needed
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditUserProfile = ({loggedInUser}) => {
  const { userId } = useParams(); // Assuming userId is passed as a route parameter
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({
    id: userId,
    firstName: '',
    lastName: '',
    monthlyBudget: 0,
    profileImage: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUsersById(loggedInUser.id);
        setUserProfile(userData); // Update state with fetched user data
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error, show user-friendly message or retry logic
      }
    };

    fetchUserProfile();
  }, [loggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: name === 'monthlyBudget' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UpdateUser(loggedInUser.id, userProfile);
      navigate(`/user-profile`); // Navigate to profile page after update
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle error, show user-friendly message or retry logic
    }
  };

  return (
    <div className="edit-user-profile">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={userProfile.firstName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={userProfile.lastName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="monthlyBudget">Monthly Budget</Label>
          <Input
            type="number"
            name="monthlyBudget"
            id="monthlyBudget"
            value={userProfile.monthlyBudget}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="profileImage">Profile Image URL</Label>
          <Input
            type="text"
            name="profileImage"
            id="profileImage"
            value={userProfile.profileImage}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit" color="primary">Update Profile</Button>
      </Form>
    </div>
  );
};

export default EditUserProfile;
