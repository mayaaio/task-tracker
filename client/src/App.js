import './App.css';
import { useAuth } from './contexts/authContext';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const { currentUser } = useAuth()

  return (
    <Routes>
      <Route path="/" element={ currentUser ? <Home /> : <Login />} />
    </Routes>
  );
}

export default App;
