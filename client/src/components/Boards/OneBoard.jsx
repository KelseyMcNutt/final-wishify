import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteBoardById } from '../../Managers/boardManager';
import { getBoardById } from '../../Managers/boardManager';
import { getItemsForBoard } from '../../Managers/boardItemManager';

function BoardItemDisplay() {
  const [items, setItems] = useState([]);
  const [boardName, setBoardName] = useState('');
  const { boardId } = useParams();
  const navigate = useNavigate(); // Use the navigate hook

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const boardData = await getBoardById(boardId);
        setBoardName(boardData.name);
      } catch (error) {
        console.error('Error fetching board details:', error);
      }
    };

    fetchBoardDetails();
  }, [boardId]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getItemsForBoard(boardId);
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [boardId]);

  const handleDelete = async () => {
    try {
      await deleteBoardById(boardId);
      navigate("/boards")
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const handleEdit = () => {
    // Navigate to the edit form page
    navigate(`/boards/${boardId}/edit`);
  };

  return (
    <div className="board-item-display">
      <h2 className="board-item-name">{boardName}</h2>
      <button onClick={handleDelete} className="delete-button">Delete</button>
      <button onClick={handleEdit} className="edit-button">Edit</button>
      <div className="board-item-grid">
        {items.map(item => (
          <div key={item.id} className="board-item">
            <img src={item.image} alt={item.name} className="board-item-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardItemDisplay;
