import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import profile from '../../img/profile.png';
import home from '../../img/home.png';
import cart  from '../../img/cart.png';
import receipt from '../../img/receipt.png';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Wrapper =styled.div`
width : 60px;
float : left;
    min-height : 100vh;
    background-color: #d63f2b;
`;

const Text = styled.div`
  img{
    width : 30px;
    margin-top: 40px;
    margin-left : 15px;
  }
`;

const Logo = styled.div`
  margin-top : 30px;
  margin-left : 15px;
  margin-right : 13px;
  margin-bottom : 20px;
  padding : 2px;
  border: 0.8px solid #d63f2b;
  border-radius : 25px;
  font-size : 1.2rem;
  color : white;
  font-weight : bold;
`;

const NavBar = () => {

    return(
        <>
        <Wrapper>
            <Logo>SW</Logo>
        <Text><Link to="/main"><img src={home}/></Link></Text>
        <Text><Link to="/myorders"><img style={{width: "35px"}} src={receipt}/></Link></Text>
          </Wrapper>
      </>
    );

}

export default NavBar;