import { Link } from "react-router-dom"
import "./register.css";
import { useState } from "react";

export default function RegisterData({ form, setForm, errors, setErrors, nextStep }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const messages = {
    name: "¿Cómo te llamas?",
    username: "Ingresa un nombre para tu usuario",
    email: "Ingresa tu correo electrónico",
    birthdate: "Ingresa tu fecha de nacimiento",
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

  const isFormValid = form.name && form.username && form.email && form.birthdate;;

  return (
    <div className="register-page">
      <div className="register-box">
        <h1>Registrate</h1>

        <div className="register-input">

          <div className="input-register">
            <div className="input-wrapper">
              <input 
                type="text" 
                name="name" 
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={50}
                required
                className={`register-input ${errors.name ? "input-error" : ""}`}
              />
              <label className={form.name ? "active" : ""}>Nombre</label>
              <span className="char-count">{form.name.length}/20</span>
            </div>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="input-register">
            <div className="input-wrapper">
              <input 
                type="text" 
                name="username" 
                value={form.username}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={50}
                required
                className={`register-input ${errors.username ? "input-error" : ""}`}
              />
              <label className={form.username ? "active" : ""}>Usuario</label>
              <span className="char-count">{form.username.length}/20</span>
            </div>
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="input-register">
            <div className="input-wrapper">
              <input 
                type="text" 
                name="email" 
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={50}
                required
                className={`register-input ${errors.email ? "input-error" : ""}`}
              />
              <label className={form.email ? "active" : ""}>Correo electronico</label>
              <span className="char-count">{form.email.length}/50</span>
            </div>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-register">
          <div className="input-wrapper">

            <input
              type="date"
              name="birthdate"
              value={form.birthdate}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`register-input ${errors.birthdate ? "input-error" : ""}`}
            />

            <label className={form.birthdate ? "active" : ""}>
              Fecha de nacimiento
            </label>

          </div>

          {errors.birthdate && (
            <p className="error">{errors.birthdate}</p>
          )}
        </div>

        </div>

        <button className="register-btn" disabled={!isFormValid} onClick={nextStep} >Continuar</button>
        <p className="register-text">¿Ya tienes una cuenta? <Link to="/">Inicia Sesión</Link></p>
      </div>
    </div>
  );
}