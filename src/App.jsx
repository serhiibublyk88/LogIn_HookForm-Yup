//npm install react-hook-form yup
//npm install react-hook-form @hookform/resolvers yup


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./App.module.css";

// Схема валидации с использованием Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Введите корректный email")
    .required("Email обязателен"),
  password: Yup.string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пароль обязателен"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
    .required("Подтверждение пароля обязательно"),
});

const AppForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setFocus,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched", // валидировать по мере фокусировки
  });

  const onSubmit = (data) => {
    console.log("Email:", data.email);
    console.log("Password:", data.password);
    console.log("Confirm Password:", data.confirmPassword);
    reset();
    setFocus("email");
  };

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          {errors.email && (
            <div className={styles.errorLabel}>{errors.email.message}</div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email")}
            className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
          />
        </div>
        <div>
          {errors.password && (
            <div className={styles.errorLabel}>{errors.password.message}</div>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password")}
            className={`${styles.input} ${
              errors.password ? styles.invalid : ""
            }`}
          />
        </div>
        <div>
          {errors.confirmPassword && (
            <div className={styles.errorLabel}>
              {errors.confirmPassword.message}
            </div>
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className={`${styles.input} ${
              errors.confirmPassword ? styles.invalid : ""
            }`}
          />
        </div>
        <button
          type="submit"
          className={`${styles.button} ${isValid ? styles.valid : ""}`}
          disabled={!isValid}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default AppForm;


