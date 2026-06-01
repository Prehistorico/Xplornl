import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../services/authService";

import NavbarAuth from "../components/Shared/Navbar-component/NavbarAuth";
import EmailWarning from "../components/warning-components/confirmEmail/emailWarning";
import AuthWarning from "../components/warning-components/authWarning/authWarning";

import "../styles/login.css";

import eyeOpen from "../assets/icons/eye-open.png";
import eyeClose from "../assets/icons/eye-close.png";
import help from "../assets/icons/help.png";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  
  const navigate = useNavigate();

  const messages = {
    email: "Ingresa tu correo electrónico",
    password: "Ingresa tu contraseña",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (showEmailWarning || showEmailModal) {
      setShowEmailWarning(false);
      setShowEmailModal(false);
    }

    if (showEmailWarning || showEmailModal || showAuthWarning) {
      setShowEmailWarning(false);
      setShowEmailModal(false);
      setShowAuthWarning(false);
    }
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
        password: form.password,
      });

      localStorage.setItem("token", data.token);

      navigate("/home");

    } catch (error) {
      console.error(error);

      if (
        error.message === "Debes verificar tu correo antes de iniciar sesión"
      ) {
        setShowEmailWarning(true);
        return;
      }

      setShowAuthWarning(true);
    }
  };

  return (
    <>
      <NavbarAuth />

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
                  className={`login-input-field ${
                    errors.email ? "input-error" : ""
                  }`}
                />

                <label className={form.email ? "active" : ""}>
                  Correo electrónico
                </label>

                <span className="char-count">
                  {form.email.length}/50
                </span>
              </div>

              {errors.email && (
                <p className="error">{errors.email}</p>
              )}
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
                  className={`login-input-field ${
                    errors.password ? "input-error" : ""
                  }`}
                />

                <label className={form.password ? "active" : ""}>
                  Contraseña
                </label>

                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img
                      src={eyeOpen}
                      alt="Mostrar contraseña"
                    />
                  ) : (
                    <img
                      src={eyeClose}
                      alt="Ocultar contraseña"
                    />
                  )}
                </span>
              </div>

              {errors.password && (
                <p className="error">{errors.password}</p>
              )}

              {showEmailWarning && (
              <p
                className="email-warning-text"
                onClick={() => setShowEmailModal(true)}
              >
                <img
                  src={help}
                  alt="Información"
                  className="warning-icon"
                />
                Debes verificar tu correo antes de iniciar sesión.
              </p>
            )}
            </div>

          </div>

          <button
            className="login-btn"
            disabled={!isFormValid}
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>

          <p className="login-text">
            ¿Aún no tienes cuenta?
            <Link to="/register"> Regístrate</Link>
          </p>
        </div>
      </div>

      {showEmailModal && (
        <EmailWarning
          onContinue={() => {
            setShowEmailModal(false);
            setShowEmailWarning(false);
          }}
        />
      )}
      {showAuthWarning && (
        <AuthWarning
          onContinue={() => setShowAuthWarning(false)}
        />
      )}
    </>
  );
}