import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusinessUsers } from '../../redux/users/operations';
import {
  selectBusinessUsers,
  selectLoading,
} from '../../redux/users/selectors';
import UserCard from '../../components/UserCard/UserCard';
import style from './UsersPage.module.css';
import BookingModal from '../../components/BookingModal/BookingModal';

export default function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectBusinessUsers);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchBusinessUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className={style.container}>
      <h1 className={style.title}>Business Users</h1>
      <div className={style.list}>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>

      <BookingModal />
    </div>
  );
}
