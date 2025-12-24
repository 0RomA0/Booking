import style from './ConfirmDeleteBookingModal.module.css';

export default function ConfirmDeleteBookingModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon}>
            <use href="/sprite.svg#icon-criss-cross" />
          </svg>
        </button>

        <h2 className={style.title}>Delete Booking</h2>
        <p>
          Are you sure you want to delete <strong>{itemName}</strong>?
        </p>

        <div className={style.buttons}>
          <button
            className={`${style.btn} ${style.btnSecondary}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${style.btn} ${style.btnPrimary}`}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
