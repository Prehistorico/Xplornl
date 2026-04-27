import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Shared/Navbar-component/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Community from "./pages/Community"
import Place from "./pages/Place"

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community" element={<Community />} />
        <Route path="/place" element={<Place />} />
      </Routes>

    </Router>
  )
}

export default App

