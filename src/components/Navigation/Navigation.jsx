import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import style from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const NavLinkActivClass = ({ isActive }) =>
    clsx(style.link, isActive && style.active);

  return (
    <>
      <NavLink to="/" className={NavLinkActivClass}>
        Home
      </NavLink>
      {isLoggedIn && (
        <>
          <NavLink to="/users" className={NavLinkActivClass}>
            Users
          </NavLink>

          <NavLink to="/bookings" className={NavLinkActivClass}>
            Bookings
          </NavLink>
        </>
      )}
    </>
  );
}
