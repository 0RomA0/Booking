import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function RestrictedRoute({ component }) {
  const isLoggedId = useSelector(selectIsLoggedIn);

  return isLoggedId ? <Navigate to="/users" /> : component;
}
