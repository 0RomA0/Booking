import LoginForm from '../../components/LoginForm/LoginForm';
import style from './LoginPage.module.css';

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
