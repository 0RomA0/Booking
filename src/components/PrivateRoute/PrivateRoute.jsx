import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function PrivateRoute({ component }) {
  const isLoggedId = useSelector(selectIsLoggedIn);

  return isLoggedId ? component : <Navigate to="/login" />;
}
