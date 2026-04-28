import { useState } from "react";
import RegisterData from "../components/register-components/RegisterData";
import RegisterPswd from "../components/register-components/RegisterPswd";

export default function Register() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

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
        />
      )}
    </>
  );
}