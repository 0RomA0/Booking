import { Outlet } from 'react-router-dom';
import style from './Header.module.css';
import AppBar from '../AppBar/AppBar';

export default function Header() {
  return (
    <>
      <header className={style.header}>
        <AppBar />
      </header>

      <Outlet />
    </>
  );
}
