import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import BoardList from './Boards/AllBoards';
import BoardForm from './Boards/NewBoards'; 
import BoardItemDisplay from './Boards/OneBoard';
import EditBoardForm from './Boards/EditBoard';
import ItemDetails from './Items/ItemDetails';
import EditItem from './Items/EditItem';
import {AllItems} from './Items/AllItems';

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      
      <Route path="/boards">
          
          <Route
          index 
          element={
            <BoardList loggedInUser={loggedInUser} />
          } 
          />
          <Route 
          path="create" 
          element={
            <BoardForm loggedInUser={loggedInUser} />
          } 
          />
          <Route path=":boardId"
           element={
            <BoardItemDisplay loggedInUser={loggedInUser} />
           } 
           />
           <Route 
            path=":boardId/edit"
            element={
              <EditBoardForm loggedInUser={loggedInUser} />
            }
            />
            

      </Route>
      <Route path="/item/:itemId" element={<ItemDetails loggedInUser={loggedInUser} />} />

      <Route path="/item/:itemId/edit" element={<EditItem loggedInUser={loggedInUser} />} /> 
      <Route path="/items" element={<AllItems loggedInUser={loggedInUser} />} />
      <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
      <Route path="/register" element={<Register setLoggedInUser={setLoggedInUser} />} />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    
    </Routes>
  );
}
