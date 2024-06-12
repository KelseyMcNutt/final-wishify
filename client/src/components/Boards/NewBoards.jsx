import React, { useState } from 'react';
import { createBoard } from '../../Managers/boardManager';
import { useNavigate } from 'react-router-dom';

function BoardForm({ loggedInUser}) {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form fields
      if (!name.trim() || !imageURL.trim()) {
        setError('Please fill in all fields');
        return;
      }

      // Create board
      const newBoard = {
        Name : name,
        BoardImage : imageURL,
        UserProfileId : loggedInUser.id
      };
      await createBoard(newBoard);
      // Redirect to board list or other route
      navigate("/boards");
    } catch (error) {
      console.error('Error creating board:', error);
      setError('Failed to create board');
    }
  };

  return (
    <div>
      <h2>Create Board</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="imageURL">Image URL:</label>
          <input 
            type="text" 
            id="imageURL" 
            value={imageURL} 
            onChange={(e) => setImageURL(e.target.value)} 
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default BoardForm;
