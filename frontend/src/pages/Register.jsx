import { Link } from "react-router-dom"
import "../styles/register.css"

export default function Register(){
return(
<div className="auth-page">
    <div className="auth-box">
        <h1>SIGN-IN</h1>

        <input type="text" placeholder="USERNAME"/>
        <input type="password" placeholder="PASSWORD"/>
        <input type="password" placeholder="CONFIRM PASSWORD"/>

        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
    </div>
</div>
)}