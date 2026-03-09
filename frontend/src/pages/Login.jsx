import { Link } from "react-router-dom"
import "../styles/login.css"

export default function Login(){

return(

<div className="auth-page">
    <div className="auth-box">

        <h1>LOG-IN</h1>

        <input type="text" placeholder="USERNAME"/>
        <input type="password" placeholder="PASSWORD"/>
        <p>¿Aun no tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
</div>

)

}