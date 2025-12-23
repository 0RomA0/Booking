import { useDispatch, useSelector } from 'react-redux';
import style from './BookingModal.module.css';
import { createBooking } from '../../redux/bookings/operations';
import { closeBookingModal } from '../../redux/bookings/slice';

export default function BookingModal() {
  const dispatch = useDispatch();
  const { isOpen, user } = useSelector((state) => state.bookings.modal);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    dispatch(createBooking({ userId: user._id, date }));
    dispatch(closeBookingModal());
  };

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>Book a meeting with {user.name}</h2>
        <form onSubmit={handleSubmit}>
          <input type="datetime-local" name="date" required />
          <button type="submit">Reserve</button>
          <button type="button" onClick={() => dispatch(closeBookingModal())}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
