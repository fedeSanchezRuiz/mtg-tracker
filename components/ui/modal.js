import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import classes from './modal.module.css';

export default function Modal({
  children,
  open,
  className = '',
  onClose,
}) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);

  const closeModalHandler = (event) => {
    if (onClose && event.target === dialog.current) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <dialog
      ref={dialog}
      className={`${classes.modal} ${className}`}
      onClick={closeModalHandler}
    >
      {children}
    </dialog>,
    document.getElementById('overlay')
  );
}
