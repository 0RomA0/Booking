import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMyBookings,
  updateBooking,
  deleteBooking,
} from '../../redux/bookings/operations';
import { selectBookingsList } from '../../redux/bookings/selectors';

import BookingCard from '../../components/BookingCard/BookingCard';
import EditBookingModal from '../../components/EditBookingModal/EditBookingModal';
import ConfirmDeleteBookingModal from '../../components/ConfirmDeleteBookingModal/ConfirmDeleteBookingModal';
import style from './BookingsPage.module.css';
import toast from 'react-hot-toast';

export default function BookingsPage() {
  const dispatch = useDispatch();
  const bookings = useSelector(selectBookingsList);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deletingBooking, setDeletingBooking] = useState(null);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  const handleSave = (updatedBooking) => {
    dispatch(
      updateBooking({
        bookingId: updatedBooking._id,
        date: updatedBooking.date,
        status: updatedBooking.status,
      }),
    );
    setSelectedBooking(null);
  };

  const handleDelete = (bookingId) => {
    dispatch(deleteBooking(bookingId));
    setDeletingBooking(null);
    toast.success('Deleted boking successfully!');
  };

  return (
    <div className={style.page}>
      <h1 className={style.title}>My bookings</h1>

      {bookings.length === 0 && <p className={style.empty}>No bookings yet</p>}

      <div className={style.list}>
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onEdit={() => {
              setSelectedBooking(booking);
              setDeletingBooking(null);
            }}
            onDelete={() => {
              setDeletingBooking(booking);
              setSelectedBooking(null);
            }}
          />
        ))}
      </div>

      {selectedBooking && (
        <EditBookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onSave={handleSave}
        />
      )}

      <ConfirmDeleteBookingModal
        isOpen={!!deletingBooking}
        bookingName={deletingBooking?.business?.businessName || 'this booking'}
        onClose={() => setDeletingBooking(null)}
        onConfirm={() => handleDelete(deletingBooking._id)}
      />
    </div>
  );
}
