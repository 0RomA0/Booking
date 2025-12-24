import style from './ConfirmDeleteModal.module.css';

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon}>
            <use href="/sprite.svg#icon-criss-cross" />
          </svg>
        </button>
        <h2 className={style.title}>Delete User</h2>
        <p>
          Are you sure you want to delete <strong>{userName}</strong>?
        </p>
        <div className={style.actions}>
          <button
            className={`${style.btn} ${style.btnCancel}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${style.btn} ${style.btnDelete}`}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
