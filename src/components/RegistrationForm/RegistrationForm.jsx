import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";
import style from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const schema = Yup.object({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format (e.g. username@mail.com)")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success("Great, you're registered");
      reset();
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.label}>Name</label>
        <input className={style.input} type="text" {...register("name")} />
        {errors.name && (
          <span className={style.errorMessage}>{errors.name.message}</span>
        )}

        <label className={style.label}>Email</label>
        <input className={style.input} type="email" {...register("email")} />
        {errors.email && (
          <span className={style.errorMessage}>{errors.email.message}</span>
        )}

        <label className={style.label}>Password</label>
        <input
          className={style.input}
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span className={style.errorMessage}>{errors.password.message}</span>
        )}

        <button className={style.btn} type="submit" disabled={isSubmitting}>
          Register
        </button>
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
