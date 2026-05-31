import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

import NavbarAuth from "../components/Shared/Navbar-component/NavbarAuth"
import RegisterData from "../components/register-components/RegisterData";
import RegisterPswd from "../components/register-components/RegisterPswd";
import ConfirmEmail from "../components/warning-components/confirmEmail/confirmEmail";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",

    birthday: "",
    birthmonth: "",
    birthyear: "",

    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleRegister = async () => {
    try {
      const birthdate =
        `${form.birthyear}-${String(form.birthmonth).padStart(2, "0")}-${String(form.birthday).padStart(2, "0")}`;

      const userData = {
        name: form.name,
        username: form.username,
        email: form.email,
        birthdate,
        password: form.password,
        confirmPassword: form.confirmPassword
      };

      const data = await registerUser(userData);
      console.log(data);
      setShowConfirmEmail(true);


      } catch (error) {
        console.error(error);

        if (error.fields) {
          const backendErrors = {};
          error.fields.forEach(field => {backendErrors[field] = error.message;});
          setErrors(backendErrors);

        } else {
          alert(error.message || 'Error al registrarse');
        }
      }
    };

  return (
    <>
      <NavbarAuth/>
      {step === 1 && (
        <RegisterData
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <RegisterPswd
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          prevStep={prevStep}
          handleRegister={handleRegister}
        />
      )}

      {showConfirmEmail && (
        <ConfirmEmail
          onContinue={() => navigate("/")}
        />
      )}
    </>
  );
}