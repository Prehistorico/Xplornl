import "./navbar.css"
import { useState } from "react"
import logo from "../../../assets/icons/xplory_logo.png"
import userIcon from "../../../assets/icons/user_icon.png"
import communIcon from "../../../assets/icons/comunidad.png"
import homeIcon from "../../../assets/icons/home.png"
import EditProfileModal from "../EditProfileModal/EditProfileModal"

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} className="logo-icon" />
          <a href="/" className="logo-text">XPLORNL</a>
        </div>
      </nav>
    </>
  )
}
