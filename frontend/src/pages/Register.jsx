import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

import RegisterData from "../components/register-components/RegisterData";
import RegisterPswd from "../components/register-components/RegisterPswd";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleRegister = async () => {

  try {
      const userData = {
        name: form.name,
        username: form.username,
        email: form.email,
        birthdate: form.birthdate,
        password: form.password,
        confirmPassword: form.confirmPassword
      };

      const data = await registerUser(userData);
      console.log(data);
      alert('Usuario registrado correctamente');
      navigate('/login');

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
    </>
  );
}