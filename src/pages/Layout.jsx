import FirebaseProvider from "../providers/FirebaseProvider";
import styled from 'styled-components';
import { Outlet } from "react-router-dom";

const Layout = () => {
    return <FirebaseProvider>
        <Title>MOBILE STORE</Title>
        <AppContainer>
            <Outlet />
        </AppContainer>
    </FirebaseProvider>
};

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100vw;
`;

const Title = styled.h1`
  text-align: center;
`

export default Layout;