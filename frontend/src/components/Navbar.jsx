import "../styles/navbar.css"
import { Link } from "react-router-dom"

import { useState } from "react"
import ProfileModal from "./ProfileModal"
import logo from "../assets/icons/xplory_logo.png"
import userIcon from "../assets/icons/user_icon.png"

export default function Navbar() {
const [profileOpen, setProfileOpen] = useState(false)

return (

<nav className="navbar">
    <div className="navbar-left">
        <img src={logo} className="logo-icon" onClick={() => setProfileOpen(true)}/>
        <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)}/>
        <Link to="/home"><h1 className="logo-text">XPLORNL</h1></Link>
    </div>

    <div className="navbar-right">
        <Link to="/login">
            <img src={userIcon} className="user-icon" />
        </Link>
    </div>
</nav>
)}