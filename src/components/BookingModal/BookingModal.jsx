import { useDispatch } from 'react-redux';
import style from './BookingModal.module.css';
import { createBooking } from '../../redux/bookings/operations';
import { useState } from 'react';
import * as yup from 'yup';
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

export default function BookingModal({ user, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    date: '',
    status: 'active',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await bookingSchema.validate(formData, { abortEarly: false });
      setErrors({});

      dispatch(
        createBooking({
          businessId: user._id,
          date: formData.date,
        }),
      );
      toast.success('Booking reserved successfully!');

      onClose();
    } catch (err) {
      const formattedErrors = {};
      err.inner.forEach((e) => {
        formattedErrors[e.path] = e.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon}>
            <use href="/sprite.svg#icon-criss-cross" />
          </svg>
        </button>

        <div className={style.modal}>
          <h2 className={style.title}>Book a meeting with {user.name}</h2>

          <form onSubmit={handleSubmit}>
            {/* DATE */}
            <label className={style.label}>
              Date
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={style.input}
                placeholder="YYYY-MM-DD"
              />
              {errors.date && (
                <p className={style.errorMessage}>{errors.date}</p>
              )}
            </label>

            {/* STATUS */}
            <label className={style.label}>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={style.input}
              >
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {errors.status && (
                <p className={style.errorMessage}>{errors.status}</p>
              )}
            </label>

            <div className={style.buttons}>
              <button
                type="submit"
                className={`${style.btn} ${style.btnPrimary}`}
              >
                Reserve
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`${style.btn} ${style.btnSecondary}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
