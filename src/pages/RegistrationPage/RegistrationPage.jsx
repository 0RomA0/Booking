import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import style from './RegistrationPage.module.css';

export default function RegistrationPage() {
  return (
    <>
      <div className={style.container}>
        <h1> Sign up please </h1>
        <RegistrationForm />
      </div>
    </>
  );
}
