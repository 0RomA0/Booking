import style from './HomePage.module.css';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Welcome to the Booking System! 😊</h1>

      <p className={style.text}>
        This is a <strong>Meeting Booking System</strong>. Here you can:
      </p>

      <ul className={style.list}>
        <li className={style.listItem}>
          Create, edit, delete, and view users (clients & business).
        </li>
        <li className={style.listItem}>
          As a <strong>client</strong>, browse business users and book
          appointments.
        </li>
        <li className={style.listItem}>
          View your own bookings and manage them (change or cancel).
        </li>
      </ul>

      <p className={style.text}>
        If you are new, please
        <NavLink to="/register" className={style.link}>
          register
        </NavLink>
        to get started.
      </p>
      <p className={style.text}>
        If you already have an account,
        <NavLink to="/login" className={style.link}>
          log in
        </NavLink>
        and start booking your appointments! 👌
      </p>
    </div>
  );
}
