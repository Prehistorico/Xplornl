import "../styles/navbar.css"
import { Link } from "react-router-dom"

import { useState } from "react"
import logo from "../assets/icons/xplory_logo.png"
import userIcon from "../assets/icons/user_icon.png"
import communIcon from "../assets/icons/comunidad.png"
import homeIcon from "../assets/icons/home.png"

export default function Navbar() {
const [profileOpen, setProfileOpen] = useState(false)

return (

<nav className="navbar">
    <div className="navbar-left">
        <img src={logo} className="logo-icon" onClick={() => setProfileOpen(true)}/>
         <a href="/login" className="logo-text">XPLORNL</a>
    </div>

    <div className="navbar-right">
        <li>
            <a href="/home" className="navbar-icon">
                <img src={homeIcon}/>
                <span>Inicio</span>
            </a>
        </li>
        <li>
            <a href="/community" className="navbar-icon">
                <img src={communIcon}/>
                <span>Comunidad</span>
            </a>
        </li>
        <li>
            <a href="/" className="navbar-icon">
                <img src={userIcon}/>
                <span>Mi Perfil</span>
            </a>
        </li>

    </div>
</nav>
)}