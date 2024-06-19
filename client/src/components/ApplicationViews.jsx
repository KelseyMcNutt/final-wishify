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
import AddItem from './Items/AddItem';
import UserProfile from './UserProfile/UserProifle';
import EditUserProfile from './UserProfile/EditUserProfile';
import NavBar from './NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import ColorPicker from './UserProfile/ColorPicker';

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      
      <Route path="/" element={
              <>
              <NavBar loggedInUser={loggedInUser}/>
              <Outlet/>
              </>
            } >
      
          <Route path="/">
              <Route index element={<BoardList loggedInUser={loggedInUser} />} />
          </Route>
          
          <Route path="create">
              <Route index element={<BoardForm loggedInUser={loggedInUser} />} />
          </Route>
          
          <Route path=":boardId">
            <Route index element={<BoardItemDisplay loggedInUser={loggedInUser} />} />
          </Route>
              
          <Route path=":boardId/edit">
            <Route index element={<EditBoardForm loggedInUser={loggedInUser} />}/>
            </Route>   
          
          <Route path="/item/:itemId">
            <Route index element={<ItemDetails loggedInUser={loggedInUser} />} />
          </Route>
          
          <Route path="/item/:itemId/edit">
            <Route index element={<EditItem loggedInUser={loggedInUser} />} /> 
          </Route>
          
          <Route path="/items">
            <Route  index element={<AllItems loggedInUser={loggedInUser} />} />
          </Route>
          
          <Route path="/items/new">
            <Route index element={<AddItem loggedInUser={loggedInUser} />}  />
          </Route>
      
      </Route>
      
      <Route path="/user-profile">
        <Route index element={<UserProfile loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
      </Route>

      <Route path="/color-picker" element={<ColorPicker loggedInUser={loggedInUser}/>} />
      
      <Route path="/user-profile/edit">
        <Route index element={<EditUserProfile loggedInUser={loggedInUser} />} />
      </Route>
      
      <Route path="/login">
        <Route index element={<Login setLoggedInUser={setLoggedInUser} />} />
      </Route>
      
      <Route path="/register">
        <Route index element={<Register setLoggedInUser={setLoggedInUser} />} />
      </Route>
      
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    
    </Routes>
  );
}
