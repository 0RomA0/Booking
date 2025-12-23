import { selectUser } from '../../redux/auth/selectors';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../redux/auth/operations';
import { useSelector } from 'react-redux';

import style from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // console.log(user);

  return (
    <div className={style.container}>
      <p className={style.username}>Welcome, {user.name}</p>
      <button
        className={style.btn}
        type="button"
        onClick={() => dispatch(logOutUser())}
      >
        Logout
      </button>
    </div>
  );
}
