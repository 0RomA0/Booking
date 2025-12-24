import { Toaster } from 'react-hot-toast';
import './App.module.css';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations';
import { selectRefreshing } from '../../redux/auth/selectors';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const UsersPage = lazy(() => import('../../pages/UsersPage/UsersPage'));
const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage'),
);
const LogInPage = lazy(() => import('../../pages/LogInPage/LogInPage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage'),
);
const BookingsPage = lazy(() =>
  import('../../pages/BookingsPage/BookingsPage'),
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p> Refreshing user... </p>
  ) : (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route
              path="/users"
              element={<PrivateRoute component={<UsersPage />} />}
            />
            <Route
              path="/bookings"
              element={<PrivateRoute component={<BookingsPage />} />}
            />

            <Route
              path="/register"
              element={<RestrictedRoute component={<RegistrationPage />} />}
            />
            <Route
              path="/login"
              element={<RestrictedRoute component={<LogInPage />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
