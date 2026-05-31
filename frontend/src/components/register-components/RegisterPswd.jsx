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

  const passwordRules = {
    minLength: form.password.length >= 8,
    hasUppercase: /[A-Z]/.test(form.password),
    hasLowercase: /[a-z]/.test(form.password),
    hasNumber: /[0-9]/.test(form.password),
    hasSpecialChar: /[#$%&_ -]/.test(form.password),
  };
  
  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.hasUppercase &&
    passwordRules.hasLowercase &&
    passwordRules.hasNumber &&
    passwordRules.hasSpecialChar;

  const isValid =
    isPasswordValid &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  return (
    <div className="register-page">
        <div className="register-box">
            <h1>Registrate</h1>
            <p className="register-text">
              Tu contraseña debe tener: 
              <ul className="password-rules">
                <li className={passwordRules.minLength ? "valid-rule" : ""}>
                  Mínimo 8 caracteres.
                </li>
                <li className={passwordRules.hasUppercase ? "valid-rule" : ""}>
                  Una mayúscula.
                </li>
                <li className={passwordRules.hasLowercase ? "valid-rule" : ""}>
                  Una minúscula.
                </li>
                <li className={passwordRules.hasNumber ? "valid-rule" : ""}>
                  Un número.
                </li>
                <li className={passwordRules.hasSpecialChar ? "valid-rule" : ""}>
                  Un carácter especial (#$%&_-).
                </li>
              </ul>
              
            </p>

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
                    <label className={form.password ? "active" : ""}>Confirmar contraseña</label>

                    <span
                        className="toggle-password"
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        {showConfirm ? (
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