import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Community from "./pages/Community"
import Place from "./pages/Place"
import ProtectedRoute from "./services/protectedRoute"
import './styles/colorDesign.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/place/:id" element={<ProtectedRoute><Place /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App

