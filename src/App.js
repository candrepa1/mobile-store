import styled from 'styled-components';
import Products from './pages/Products';
import FirebaseProvider from './providers/FirebaseProvider';

function App() {
  return (
    <FirebaseProvider>
      <Title>MOBILE STORE</Title>
      <AppContainer data-testid="random">
        <Products />
      </AppContainer>
    </FirebaseProvider>
  );
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

export default App;
