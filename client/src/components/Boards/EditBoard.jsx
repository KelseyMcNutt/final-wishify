import React, { useState, useEffect } from 'react';
import { editBoardById, getBoardById } from '../../Managers/boardManager';
import { useNavigate, useParams } from 'react-router-dom';

function EditBoardForm({ loggedInUser }) {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { boardId } = useParams();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardData = await getBoardById(boardId);
        setName(boardData.name);
        setImageURL(boardData.boardImage);
      } catch (error) {
        console.error('Error fetching board:', error);
      }
    };

    fetchBoard();
  }, [boardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

      const updatedBoard = {
        Id: parseInt(boardId),
        Name: name,
        BoardImage: imageURL,
        UserProfileId: loggedInUser.id
      };
      await editBoardById(parseInt(boardId), updatedBoard);
      navigate(`/${boardId}`);
  };

  return (
    <div>
      <h2>Edit Board</h2>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditBoardForm;
