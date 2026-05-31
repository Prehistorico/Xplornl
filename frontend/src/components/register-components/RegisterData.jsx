import { Link } from "react-router-dom";
import "./register.css";

export default function RegisterData({form, setForm, errors, setErrors, nextStep,})
{
const handleChange = (e) => {
  const { name, value } = e.target;

  const updatedForm = {
    ...form,
    [name]: value,
  };

  setForm(updatedForm);

  if (
    updatedForm.birthday &&
    updatedForm.birthmonth &&
    updatedForm.birthyear
  ) {
    const day = Number(updatedForm.birthday);
    const month = Number(updatedForm.birthmonth);
    const year = Number(updatedForm.birthyear);

    const birthDate = new Date(year, month - 1, day);

    let birthError = "";

    if (
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() !== month - 1 ||
      birthDate.getDate() !== day
    ) {
      birthError = "La fecha de nacimiento no es válida";
    }

    setErrors((prev) => ({
      ...prev,
      birthday: birthError,
      birthmonth: birthError,
      birthyear: birthError,
    }));
  }
};

  const messages = {
    name: "¿Cómo te llamas?",
    username: "Ingresa un nombre para tu usuario",
    email: "Ingresa tu correo electrónico",
    birthday: "Ingresa tu día de nacimiento",
    birthmonth: "Ingresa tu mes de nacimiento",
    birthyear: "Ingresa tu año de nacimiento",
  };

  const validateBirthDate = () => {
    const day = Number(form.birthday);
    const month = Number(form.birthmonth);
    const year = Number(form.birthyear);

    if (!day || !month || !year) {
      return "";
    }

    const birthDate = new Date(year, month - 1, day);

    if (
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() !== month - 1 ||
      birthDate.getDate() !== day
    ) {
      return "La fecha de nacimiento no es válida";
    }

    const today = new Date();

    if (birthDate > today) { return "La fecha no puede ser futura";}

    const oldestDate = new Date();
    oldestDate.setFullYear(today.getFullYear() - 112);

    if (birthDate < oldestDate) {return "La edad máxima permitida es 112 años";}

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {age--;}

    if (age < 18) {return "Debes tener al menos 18 años";}

    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: messages[name],
      }));
      return;
    }

    let error = "";

    switch (name) {
      case "name":
        if (value.length < 3) {
          error = "El nombre debe tener al menos 3 caracteres";
        } else if (value.length > 20) {
          error = "El nombre no puede superar los 20 caracteres";
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
          error = "El nombre no puede contener números ni caracteres especiales";
        }
        break;

      case "username":
        if (value.length < 3) {
          error = "El usuario debe tener al menos 3 caracteres";
        } else if (value.length > 20) {
          error = "El usuario no puede superar los 20 caracteres";
        }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Ingresa un correo electrónico válido";
        }
        break;

      case "birthday":
      case "birthmonth":
      case "birthyear":
        error = validateBirthDate();
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const birthDateError = validateBirthDate();

  const isFormValid =
    form.name.length >= 3 &&
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.name) &&
    form.username.length >= 3 &&
    form.username.length <= 20 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.birthday &&
    form.birthmonth &&
    form.birthyear &&
    !birthDateError;

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
                maxLength={20}
                required
                className={errors.name ? "input-error" : ""}
              />

              <label className={form.name ? "active" : ""}>
                Nombre
              </label>

              <span className="char-count">
                {form.name.length}/20
              </span>
            </div>

            {errors.name && (
              <p className="error">{errors.name}</p>
            )}
          </div>

          <div className="input-register">
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={20}
                required
                className={errors.username ? "input-error" : ""}
              />

              <label className={form.username ? "active" : ""}>
                Usuario
              </label>

              <span className="char-count">
                {form.username.length}/20
              </span>
            </div>

            {errors.username && (
              <p className="error">{errors.username}</p>
            )}
          </div>

          <div className="input-register">
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={50}
                required
                className={errors.email ? "input-error" : ""}
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

          <div className="input-register">
            <div className="register-date">
              <div className="input-wrapper">
                <input
                  type="number"
                  name="birthday"
                  value={form.birthday}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  max="31"
                  placeholder="Día"
                  className={errors.birthday ? "input-error" : ""}
                />
              </div>

              <div className="input-wrapper">
                <input
                  type="number"
                  name="birthmonth"
                  value={form.birthmonth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  max="12"
                  placeholder="Mes"
                  className={errors.birthmonth ? "input-error" : ""}
                />
              </div>

              <div className="input-wrapper">
                <input
                  type="number"
                  name="birthyear"
                  value={form.birthyear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="Año"
                  className={errors.birthyear ? "input-error" : ""}
                />
              </div>
            </div>

            {(errors.birthday ||
              errors.birthmonth ||
              errors.birthyear) && (
              <p className="error">
                {errors.birthday ||
                  errors.birthmonth ||
                  errors.birthyear}
              </p>
            )}
          </div>
        </div>

        <button
          className="register-btn"
          disabled={!isFormValid}
          onClick={nextStep}
        >Continuar
        </button>

        <p className="register-text">
          ¿Ya tienes una cuenta? <Link to="/">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}