import React, { useEffect, useState } from 'react';
import { getItemDetailsById } from '../../Managers/itemManager';
import { getBoardItemsByItemId, updateBoardItems} from '../../Managers/boardItemManager';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardsByUserId } from '../../Managers/boardManager';
import { deleteItem } from '../../Managers/itemManager';
import "./Items.css"


function ItemDetails({loggedInUser}) {
  const [item, setItem] = useState(null);
  const [boards, setBoards] = useState([]);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemDetails = await getItemDetailsById(parseInt(itemId));
        setItem(itemDetails);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    const fetchBoardItems = async () => {
      try {
        const boardItems = await getBoardItemsByItemId(parseInt(itemId));
        const allBoards = await getBoardsByUserId(loggedInUser.id);
        setBoards(allBoards);
        setSelectedBoards(boardItems.map(bi => bi.boardId));
      } catch (error) {
        console.error('Error fetching board items:', error);
      }
    };

    fetchItemDetails();
    fetchBoardItems();
  }, [itemId]);

  const handleBoardChange = (boardId) => {
    setSelectedBoards(prevSelectedBoards =>
      prevSelectedBoards.includes(boardId)
        ? prevSelectedBoards.filter(id => id !== boardId)
        : [...prevSelectedBoards, boardId]
    );
  };

  const handleSave = async () => {
    try {
      await updateBoardItems(itemId, selectedBoards);
    } catch (error) {
      console.error('Error updating board items:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(itemId);
      navigate(`/boards`); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-details">
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.name} />
      <p>Price: ${item.price}</p>
      <p>Link: <a href={item.link}>{item.link}</a></p>
      <p>Store: {item.store.name}</p>
      <button onClick={() => navigate(`/item/${itemId}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <h1>Boards</h1>
      <div className="board-list">
        {boards.map(board => (
          <div key={board.id}>
            <input
              type="checkbox"
              checked={selectedBoards.includes(board.id)}
              onChange={() => handleBoardChange(board.id)}
            />
            {board.name}
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default ItemDetails;
