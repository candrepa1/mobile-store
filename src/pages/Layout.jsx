import FirebaseProvider from "../providers/FirebaseProvider";
import styled from 'styled-components';
import { Outlet } from "react-router-dom";
import CartProvider from "../providers/CartProvider";

const Layout = () => {
  return <FirebaseProvider>
    <CartProvider>
      <Title>MOBILE STORE</Title>
      <AppContainer>
        <Outlet />
      </AppContainer>
    </CartProvider>
  </FirebaseProvider>
};

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 90vw;
  margint-top: 100px;
`;

const Title = styled.h1`
  text-align: center;
  height: 10vh;
`

export default Layout;