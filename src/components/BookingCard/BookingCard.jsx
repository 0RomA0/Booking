import { useDispatch } from 'react-redux';
import { openEditBookingModal } from '../../redux/bookings/slice';
import style from './BookingCard.module.css';

export default function BookingCard({ booking }) {
  const dispatch = useDispatch();

  return (
    <div className={style.card}>
      <div className={style.info}>
        <p className={style.business}>{booking.business.businessName}</p>
        <p className={style.date}>{booking.date}</p>
      </div>

      <div className={style.actions}>
        <button
          className={style.editBtn}
          onClick={() => dispatch(openEditBookingModal(booking))}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
