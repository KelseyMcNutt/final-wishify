import React, { useState, useEffect } from 'react';
import { getBoardsByUserId } from '../../Managers/boardManager';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import "./AllBoards.css";

function BoardList({ loggedInUser }) {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await getBoardsByUserId(loggedInUser.id);
        setBoards(response);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards();
  }, [loggedInUser]);

  // Function to handle navigation to the create board form
  const navigateToCreateBoard = () => {
    navigate('/board/create');
  };

  return (
    <div className="board-list-container">
      <div className="board-list-header">
        <h2>Boards</h2>
        <button onClick={navigateToCreateBoard} className="create-board-btn">Create Board</button>
      </div>
      <div className="board-list">
        {boards.map(board => (
          <div key={board.id} className="board-item">
            <h3>{board.name}</h3>
            <img src={board.boardImage} alt={board.name} style={{ maxWidth: '200px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardList;
