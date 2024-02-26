import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import CheckIcon from '../icons/check-icon';
import classes from './cart-reminder.module.css';

const CartReminder = ({ message, onClose }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose();
    }, 800);

    return () => clearTimeout(timerId);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={classes.container}>
      <CheckIcon />
      <p>{message}</p>
    </div>,
    document.getElementById('overlay')
  );
};

export default CartReminder;
