import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import style from './SignInForm.module.css';

export default function LogInForm() {
  const dispatch = useDispatch();

  const schema = Yup.object({
    email: Yup.string()
      .email('Invalid email format (e.g. username@mail.com)')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(30, 'Password must be at most 30 characters')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(logInUser(data)).unwrap();
      toast.success("Great, you're logged in");
      reset();
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.label}>Email</label>
        <input className={style.input} type="email" {...register('email')} />
        {errors.email && (
          <span className={style.errorMessage}>{errors.email.message}</span>
        )}

        <label className={style.label}>Password</label>
        <input
          className={style.input}
          type="password"
          {...register('password')}
        />
        {errors.password && (
          <span className={style.errorMessage}>{errors.password.message}</span>
        )}

        <button className={style.btn} type="submit" disabled={isSubmitting}>
          Log In
        </button>
      </form>
    </>
  );
}
