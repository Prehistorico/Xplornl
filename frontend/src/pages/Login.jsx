import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

import "../styles/login.css";
import { useState } from "react";

import eyeOpen from "../assets/icons/eye-open.png";
import eyeClose from "../assets/icons/eye-close.png";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const messages = {
    email: "Ingresa tu correo electrónico",
    password: "Ingresa tu contraseña",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: messages[name],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const isFormValid = form.email && form.password;

  const handleLogin = async () => {
  try {
    const data = await loginUser({
      email: form.email,
      password: form.password
    });

    console.log(data);
    localStorage.setItem('token', data.token);
    alert('Inicio de sesión exitoso');
    navigate('/home');
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Inicia Sesión</h1>

        <div className="login-input">

          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={50}
                required
                className={`login-input-field ${errors.email ? "input-error" : ""}`}
              />
              <label className={form.email ? "active" : ""}>
                Correo electrónico
              </label>
              <span className="char-count">{form.email.length}/50</span>
            </div>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={50}
                required
                className={`login-input-field ${errors.password ? "input-error" : ""}`}
              />
              <label className={form.password ? "active" : ""}>Contraseña</label>

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                    <img src={eyeOpen} alt="Mostrar contraseña" />
                ) : (
                    <img src={eyeClose} alt="Ocultar contraseña" />
                )}
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </div>

        <button className="login-btn" disabled={!isFormValid}onClick={handleLogin}>
          Iniciar Sesión
        </button>

        <p className="login-text">¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </div>
  );
}