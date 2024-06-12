import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import BoardList from './Boards/AllBoards';
import BoardForm from './Boards/NewBoards'; // Import the BoardForm component

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      
      <Route path="/board">
          <Route
          index 
          element={
            <BoardList loggedInUser={loggedInUser} />
          } 
          />
          <Route 
          path=":create" 
          element={
            <BoardForm loggedInUser={loggedInUser} />
          } 
          />
      </Route>
      
      <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
      <Route path="/register" element={<Register setLoggedInUser={setLoggedInUser} />} />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
