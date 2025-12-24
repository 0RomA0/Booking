import style from './BookingCard.module.css';

export default function BookingCard({ booking, onEdit, onDelete }) {
  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString('en-GB')
    : 'N/A';

  return (
    <div className={style.card}>
      <div className={style.info}>
        <p className={style.business}>
          {booking.business?.businessName || 'N/A'}
        </p>
        <p className={style.date}>{formattedDate}</p>
        <p>
          Client: {booking.client?.name || 'N/A'} (
          {booking.client?.email || 'N/A'})
        </p>
        <p>Status: {booking.status || 'N/A'}</p>
      </div>

      <div className={style.actions}>
        <button className={style.editBtn} onClick={onEdit}>
          Edit
        </button>

        <button className={style.btnDelete} onClick={onDelete}>
          <svg className={style.icon}>
            <use href="/sprite.svg#icon-trash" />
          </svg>
        </button>
      </div>
    </div>
  );
}
