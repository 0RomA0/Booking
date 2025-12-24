import style from './UserCard.module.css';

export default function UserCard({ user, onBook, onDelete }) {
  // console.log(user);
  return (
    <div className={style.card}>
      <svg className={style.icon}>
        <use href="#icon-user-business" />
      </svg>
      <div className={style.info}>
        <p className={style.name}>{user.name}</p>
        <p className={style.email}>{user.email}</p>
        <p>{user.businessName}</p>
        <p>{user.phoneNumber}</p>
      </div>
      <div className={style.actions}>
        <button className={style.btnEdit} onClick={onBook}>
          <svg className={style.icon}>
            <use href="/sprite.svg#icon-edit" />
          </svg>
        </button>
        <button className={style.btnDelete} onClick={() => onDelete(user._id)}>
          <svg className={style.icon}>
            <use href="/sprite.svg#icon-trash" />
          </svg>
        </button>
      </div>
    </div>
  );
}
