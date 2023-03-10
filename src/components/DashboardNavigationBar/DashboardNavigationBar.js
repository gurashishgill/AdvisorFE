import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/logo.png";
import "./DashboardNavigationBar.css";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function DashboardNavigationBar() {
  const dispatch = useDispatch();
  const { userinfo } = useSelector((state) => state.advisor);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 nav_container" navbarScroll>
            <div className="nav_item_1">
              <Nav.Link href="/">
                <img src={logo} style={{ height: "40px" }} />
              </Nav.Link>
            </div>
            <div className="nav_item_2">
              <NavDropdown
                title={userinfo.sortName}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/advisor/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/Dashboard">Dashboard</NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="/ClientLogin">
                  Login as Client
                </NavDropdown.Item> */}
              </NavDropdown>
              <Nav.Link className="logout_button" onClick={handleLogout}>
                Logout <FiLogOut />
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashboardNavigationBar;
