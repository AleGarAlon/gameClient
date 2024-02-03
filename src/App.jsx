import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import Character from "./pages/Character";
import Map from "./pages/Map";
import Navbar from "./components/Navbar";
import StartPage from "./pages/Startpage";

import Train from "./pages/Train";
import Shop from "./pages/Shop";
import Armory from "./pages/Armory";

function App() {
  const location = useLocation();
  const excludeNavbarRoutes = ["/login", "/signup", "/", "/create"];
  const shouldShowNavbar = !excludeNavbarRoutes.includes(location.pathname);

  return (
    <div className="app">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/character" element={<Character />} />
        <Route path="/explore/:location" element={<Explore />} />
        <Route path="/map" element={<Map />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="armory" element={<Armory />} />
        <Route path="/train" element={<Train />} />
      </Routes>
    </div>
  );
}

export default App;
