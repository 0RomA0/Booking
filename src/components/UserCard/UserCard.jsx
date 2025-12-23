import { useDispatch } from 'react-redux';
import style from './UserCard.module.css';
import { openBookingModal } from '../../redux/bookings/slice';

export default function UserCard({ user }) {
  const dispatch = useDispatch();
  return (
    <div className={style.card}>
      <svg className={style.icon}>
        <use href="#icon-user-business" />
      </svg>
      <div className={style.info}>
        <p className={style.name}>{user.name}</p>
        <p className={style.email}>{user.email}</p>
      </div>
      <div className={style.actions}>
        <button
          className={style.btnEdit}
          onClick={() => dispatch(openBookingModal(user))}
        >
          <svg className={style.icon}>
            <use href="/sprite.svg#icon-edit" />
          </svg>
        </button>
        <button className={style.btnDelete}>
          <svg className={style.icon}>
            <use href="/sprite.svg#icon-trash" />
          </svg>
        </button>
      </div>
    </div>
  );
}
