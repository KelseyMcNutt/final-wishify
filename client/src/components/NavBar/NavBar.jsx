import { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import "./NavBar.css"; 
import { getUsersById } from "../../Managers/userManager";
import { useNavigate } from "react-router-dom";
import "../../../public/uploads/logo.png"

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({})
  const navigate = useNavigate();

  const toggleNavbar = () => setOpen(!open);

  useEffect(() => {
    getUsersById(loggedInUser.id).then(setProfile)
    }, [loggedInUser]);

  

  return (
    <div className="navbar-container">
      <Navbar className="navbar" color="white" light fixed="true" expand="lg" >
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
    
          <img className="logo-img" src="/uploads/logo2.png" alt="logo"></img>
         
        </NavbarBrand>
        {loggedInUser ? (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-boards" tag={RRNavLink} to="/">
                    Boards
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-items" tag={RRNavLink} to="/items">
                    All Items
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  tag={RRNavLink} to="/user-profile">
                    <img  className="nav-image" src={profile.profileImage} alt="profile image"></img>
                    
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
        
            
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}
