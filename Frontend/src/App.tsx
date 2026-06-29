import Admin from "./pages/Admin";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DealDetail from "./pages/DealDetail";
import MyClaims from "./pages/myClaims";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/deal/:id" element={<DealDetail />} />
      <Route path="/my-claims" element={<MyClaims />} />
    </Routes>
  );
}

export default App;