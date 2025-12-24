import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchBusinessUsers } from '../../redux/users/operations';
import {
  selectBusinessUsers,
  selectLoading,
} from '../../redux/users/selectors';
import UserCard from '../../components/UserCard/UserCard';
import BookingModal from '../../components/BookingModal/BookingModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal/ConfirmDeleteModal';
import style from './UsersPage.module.css';
import toast from 'react-hot-toast';

export default function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectBusinessUsers);
  const loading = useSelector(selectLoading);

  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchBusinessUsers());
  }, [dispatch]);

  const confirmDelete = () => {
    if (!deletingUser) return;
    dispatch(deleteUser(deletingUser._id));
    setDeletingUser(null);
    toast.success('Deleted user successfully!');
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className={style.container}>
      <h1 className={style.title}>Business Users</h1>

      <div className={style.list}>
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onBook={() => setEditingUser(user)}
            onDelete={() => setDeletingUser(user)}
          />
        ))}
      </div>

      {editingUser && (
        <BookingModal user={editingUser} onClose={() => setEditingUser(null)} />
      )}

      <ConfirmDeleteModal
        isOpen={!!deletingUser}
        userName={deletingUser?.name}
        onClose={() => setDeletingUser(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
