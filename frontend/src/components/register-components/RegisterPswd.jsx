import { Link } from "react-router-dom"
import "./register.css";
import { useState } from "react";

export default function RegisterPswd({
  form,
  setForm,
  errors,
  setErrors,
  prevStep,
  handleRegister
}) 
{
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Este campo es obligatorio",
      }));
    } else if (name === "confirmPassword" && value !== form.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Las contraseñas no coinciden",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  

  const isValid =
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  return (
    <div className="register-page">
        <div className="register-box">
            <h1>Registrate</h1>
            <p className="register-text">Asegúrate que tu contraseña tenga 8 caracteres o más.</p>
            <div className="register-input">

                <div className="input-register">
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
                            <img src="eye-open.png" alt="Mostrar contraseña" />
                        ) : (
                            <img src="eye-close.png" alt="Ocultar contraseña" />
                        )}
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                    
                <div className="input-register">
                    <div className="input-wrapper">
                    <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={50}
                        required
                        className={`login-input-field ${errors.password ? "input-error" : ""}`}
                    />
                    <label className={form.password ? "active" : ""}>Contraseña</label>

                    <span
                        className="toggle-password"
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        {showPassword ? (
                            <img src="eye-open.png" alt="Mostrar contraseña" />
                        ) : (
                            <img src="eye-close.png" alt="Ocultar contraseña" />
                        )}
                    </span>
                    </div>
                     {errors.confirmPassword && (<p className="error">{errors.confirmPassword}</p>)}
                </div>
            </div>

            <div className="register-options">
                <button className="register-btn" onClick={prevStep}>Atrás</button>
                <button
                  className="register-btn"
                  disabled={!isValid}
                  onClick={handleRegister}
                >Registrarse</button>
            </div>
            <p className="register-text">¿Ya tienes una cuenta? <Link to="/">Inicia Sesión</Link></p>
       </div>
    </div>
  );
}