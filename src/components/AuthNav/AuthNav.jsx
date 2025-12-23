import { NavLink } from 'react-router-dom';
import style from './AuthNav.module.css';
import clsx from 'clsx';

const NavLinkActivClass = ({ isActive }) =>
  clsx(style.link, isActive && style.active);

export default function AuthNav() {
  return (
    <>
      <NavLink to="/register" className={NavLinkActivClass}>
        Register
      </NavLink>
      <NavLink to="/login" className={NavLinkActivClass}>
        Log In
      </NavLink>
    </>
  );
}
