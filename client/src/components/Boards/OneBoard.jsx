import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteBoardById } from '../../Managers/boardManager';
import { getBoardById } from '../../Managers/boardManager';
import { getItemsForBoard } from '../../Managers/boardItemManager';
import { Link } from 'react-router-dom';
import "./OneBoard.css"

function BoardItemDisplay() {
  const [items, setItems] = useState([]);
  const [boardName, setBoardName] = useState('');
  const { boardId } = useParams();
  const navigate = useNavigate(); 

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
        const itemsData = await getItemsForBoard(boardId);
        setItems(itemsData);
     
    };

    fetchItems();
  }, [boardId]);

  const handleDelete = async () => {
    try {
      await deleteBoardById(boardId);
      navigate("/")
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/${boardId}/edit`);
  };

  return (
    <div className="board-item-display">
      <h2 className="board-item-name">{boardName}</h2>
      <button onClick={handleDelete} className="delete-button">Delete</button>
      <button onClick={handleEdit} className="edit-button">Edit</button>
      <div className="board-item-grid">
        {items.map(item => (
          <div key={item.id} className="board-item">
            <Link to={`/item/${item.id}`}>
              <img src={item.image} alt={item.name} className="board-item-image" />
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardItemDisplay;
