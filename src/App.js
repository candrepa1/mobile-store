import './App.css';
import Register from './pages/Register';
import FirebaseProvider from './providers/FirebaseProvider';

function App() {
  return (
    <FirebaseProvider>
      <div className="App">
        <Register />
      </div>
    </FirebaseProvider>
  );
}

export default App;
