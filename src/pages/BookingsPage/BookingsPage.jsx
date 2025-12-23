import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBookings } from '../../redux/bookings/operations';

import BookingCard from '../../components/BookingCard/BookingCard';
import BookingModal from '../../components/BookingModal/BookingModal';
import style from './BookingsPage.module.css';

export default function BookingsPage() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.list);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  return (
    <div className={style.page}>
      <h1 className={style.title}>My bookings</h1>

      {bookings.length === 0 && <p className={style.empty}>No bookings yet</p>}

      <div className={style.list}>
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>

      <BookingModal />
    </div>
  );
}
