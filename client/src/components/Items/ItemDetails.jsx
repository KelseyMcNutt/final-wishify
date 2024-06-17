import React, { useEffect,  useState } from 'react';
import { getItemDetailsById } from '../../Managers/itemManager';
import { getBoardItemsByItemId, updateBoardItems} from '../../Managers/boardItemManager';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardsByUserId } from '../../Managers/boardManager';
import { deleteItem } from '../../Managers/itemManager';
import "./ItemDetails.css"
import { IoArrowBackSharp } from "react-icons/io5";
import { addCartItem } from '../../Managers/itemManager';



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

  }, [itemId, loggedInUser.id]);

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
      navigate(`/`); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const backButtonClicked = () => {
    const editClicked = localStorage.getItem('editClicked') === 'true';
    const clickNum = localStorage.getItem('clickedAmount')
    if (editClicked) {
      localStorage.removeItem('editClicked');
      localStorage.removeItem('clickedAmount')
      navigate(-(clickNum));
    } else {
      navigate(-1);
    }
  };

 

  const handleEdit = () => {
    localStorage.setItem('editClicked', 'true');
    let clickedAmount = parseInt(localStorage.getItem('clickedAmount')) || 1;
    clickedAmount += 2
    localStorage.setItem('clickedAmount', clickedAmount)
    navigate(`/item/${itemId}/edit`)
   
  }

  const addCart = () => {
      addCartItem(itemId);
      setItem({ ...item, inCart: true });
   
  };

 

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className='item-details-page'>
      <button className='back-btn' onClick={backButtonClicked}> <IoArrowBackSharp /> </button>
    <div className="item-details">
        <h2>{item.name}</h2>
        <img src={item.image} alt={item.name} />
        <p>Price: ${item.price}</p>
        <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
        <p>Store: {item.store.name}</p>
        <button onClick={handleDelete} className='delete-item'>Delete</button>
        <button onClick={handleEdit} className='edit-item'>Edit</button>
        <button onClick={addCart} className='cart-button'>Cart</button>        
      </div>
     
      <div className='boards-list-div'>
        <h3 className='board-title'>Boards</h3>
        <div className="board-list-item">
          {boards.map(board => (
            <div key={board.id} className='each-item'>
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
    </div>
  );
}

export default ItemDetails;
