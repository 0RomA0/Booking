import LogInForm from '../../components/SignInForm/SignInForm';
import style from './SignInPage.module.css';

export default function LogInPage() {
  return (
    <>
      <div className={style.container}>
        <h1>Sign in please</h1>
        <LogInForm />
      </div>
    </>
  );
}
