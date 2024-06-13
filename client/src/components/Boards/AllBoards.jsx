import React, { useState, useEffect } from 'react';
import { getBoardsByUserId } from '../../Managers/boardManager';
import { Link, useNavigate } from 'react-router-dom';
import "./AllBoards.css";

function BoardList({ loggedInUser }) {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

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
    navigate('/boards/create');
  };

  return (
    <div className="board-list-container">
      <div className="board-list-header">
        <h2>Boards</h2>
        <button onClick={navigateToCreateBoard} className="create-board-btn">Create Board</button>
      </div>
      <div className="board-list">
        {boards.map(board => (
          <Link key={board.id} to={`/boards/${board.id}`} className="board-item-link">
            <div className="board-item">
              <h3>{board.name}</h3>
              <img src={board.boardImage} alt={board.name} style={{ maxWidth: '200px' }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BoardList;
