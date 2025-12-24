import { useState, useEffect } from 'react';
import * as yup from 'yup';
import style from './EditBookingModal.module.css';
import toast from 'react-hot-toast';

const bookingSchema = yup.object({
  date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in format YYYY-MM-DD')
    .required('Date is required'),
  status: yup
    .string()
    .oneOf(['active', 'cancelled'])
    .required('Status is required'),
});

export default function EditBookingModal({ booking, onClose, onSave }) {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (booking) {
      setTimeout(() => {
        setDate(booking.date ? booking.date.slice(0, 10) : '');
        setStatus(booking.status || '');
      }, 0);
    }
  }, [booking]);

  if (!booking) return null;

  const handleSave = async () => {
    try {
      await bookingSchema.validate({ date, status }, { abortEarly: false });
      setErrors({});
      onSave({ ...booking, date, status });
      toast.success('Booking updated successfully!');
    } catch (validationError) {
      const errObj = {};
      validationError.inner.forEach((err) => {
        errObj[err.path] = err.message;
      });
      setErrors(errObj);
    }
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon}>
            <use href="/sprite.svg#icon-criss-cross" />
          </svg>
        </button>

        <h2 className={style.title}>Edit Booking</h2>

        <p className={style.info}>
          <strong>Business:</strong> {booking.business?.name || 'N/A'}
        </p>
        <p className={style.info}>
          <strong>Client:</strong> {booking.client?.name || 'N/A'} (
          {booking.client?.email || 'N/A'})
        </p>

        <div className={style.field}>
          <label className={style.label}>Date:</label>
          <input
            className={style.input}
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <p className={style.error}>{errors.date}</p>}
        </div>

        <div className={style.field}>
          <label className={style.label}>Status:</label>
          <select
            className={style.input}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && <p className={style.error}>{errors.status}</p>}
        </div>

        <div className={style.actions}>
          <button
            className={`${style.btn} ${style.btnPrimary}`}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
