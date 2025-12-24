import LoginForm from '../../components/LogInForm/LogInForm';
import style from './LogInPage.module.css';

export default function LoginPage() {
  return (
    <>
      <div className={style.container}>
        <h1>Login please</h1>
        <LoginForm />
      </div>
    </>
  );
}
