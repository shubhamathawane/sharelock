import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Nav = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: jetBrains Mono;
    flex-wrap: wrap;
    background: ${({ theme }) => theme.bg};
    position: absolute;
    top: -5px;
    left: 0;
    right: 0;
  `;

  const Slink = styled(Link)`
    padding: 1rem 2rem;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: #67bc98;
    transition: all 0.3s ease-in;
    font-size: 1rem;
    &:hover {
      background-color: #67bc98;
      color: white;
      border-radius: 10px;
    }
  `;

  const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
    align-items: center;
    position: sticky;
    position: relative;
    @media (max-width: 768px) {
      overflow: hidden;
      flex-direction: column;
      max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
      transition: max-height 0.3s ease-in;
      width: 100%;
    }
  `;

  const Logo = styled.a`
    padding: 1rem 0;
    color: #7b7fda;
    text-decoration: none;
    font-weight: 800;
    font-size: 1.7rem;
    span {
      font-weight: 300;
      font-size: 1.3rem;
    }
  `;

  const Hamburger = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;
    span {
      height: 2px;
      width: 25px;
      background: #55f56a84;
      margin-bottom: 4px;
      border-radius: 5px;
    }
    @media (max-width: 768px) {
      display: flex;
    }
  `;

  return (
    <div className="pb-5">
      <Nav className="">
        <Logo href="">
          Share<span>Lock</span>
        </Logo>
        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Menu isOpen={isOpen}>
          {/* <Button
          title="change Theme"
          onClick={() => setDarkMode(!darkMode)}
          variant="outlined"
          pill
        >
          {darkMode ? (
            <LightModeIcon style={{ color: "#55f56a84" }} />
          ) : (
            <NightsStayIcon color="primary" />
          )}
        </Button> */}

          <Slink to="/">Home</Slink>
          <Slink to="/code">Share Docs</Slink>
          <Slink to="/chat">Chat</Slink>
          <Slink to="">Contact</Slink>
          <Slink to="/about">About</  Slink>
        </Menu>
      </Nav>
    </div>
  );
};

export default NavBar;
