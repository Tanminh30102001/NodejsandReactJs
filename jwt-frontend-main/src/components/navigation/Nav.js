import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "../../context/UserContext";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";
import SearchInput from "../search/SearchPost";
const NavStyle = styled.div`
  .icon-react {
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
  }
  .nav-link {
    &:hover {
      color: #6bdefc !important;
      opacity: 0.2s;
    }
  }
  .nav-link {
    &.active {
      color: #6bdefc !important;
    }
  }
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
const NavHeader = () => {
  const {
    user,
    setUser,
    defaultUserData,
    checkRoleUsers,
    checkRoleRoles,
    checkRoleGroups,
    checkRoleCategories,
    checkRolePosts,
  } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logoutUser(); // clear cookies
    if (+res.EC === 0) {
      localStorage.removeItem("jwt");
      toast.success("Logout successful!");
      setUser(defaultUserData);
      navigate("/login");
    }
  };
  return (
    <NavStyle>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand
            className="icon-react"
            onClick={() => navigate("/")}
            style={{ cursor: `${location.pathname === "/" ? "" : "pointer"}` }}
          >
            <img src="../../../logo192.png" alt="" width={40} height={40} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className={"nav-link"} to="/">
                Home
              </NavLink>
              {checkRoleUsers === true && (
                <NavLink className={"nav-link"} to="/users">
                  Users
                </NavLink>
              )}
              {checkRoleRoles && (
                <NavLink className={"nav-link"} to="/roles">
                  Roles
                </NavLink>
              )}
              {checkRoleGroups && (
                <NavLink className={"nav-link"} to="/groups">
                  Groups
                </NavLink>
              )}
              {checkRoleCategories && (
                <NavLink className={"nav-link"} to="/categories">
                  Categories
                </NavLink>
              )}
              {checkRolePosts && (
                <NavLink className={"nav-link"} to="/posts">
                  Posts
                </NavLink>
              )}
            </Nav>
            {location.pathname === "/post/search" && (
              <SearchInput></SearchInput>
            )}
            {location.pathname === "/" && <SearchInput></SearchInput>}
            <Nav>
              {user?.isAuthenticated ? (
                <>
                  <Nav.Link href="#deets">
                    Welcome {user?.account?.username}!
                  </Nav.Link>
                  <NavDropdown
                    title="Settings"
                    id="basic-nav-dropdown"
                    className=""
                  >
                    <NavDropdown.Item href="#action/3.1">
                      Change password
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav className="me-auto">
                  <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </NavStyle>
  );
};

export default NavHeader;
