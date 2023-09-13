import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Signup from "./pages/Signup"
import Login from './pages/Login'
import MainScreen from './pages/MainScreen'
import Explore from './pages/Explore'
import Character from './pages/character'
import Map from './pages/Map'
import Navbar from './components/Navbar'
import StartPage from './pages/Startpage'


function App() {
  const location = useLocation(); 
  const excludeNavbarRoutes = ["/login", "/signup","/"];
  const shouldShowNavbar = !excludeNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/character" element={<Character />} />
        <Route path="/explore/:location" element={<Explore />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
  
}

export default App
