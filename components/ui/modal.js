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

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && open && onClose) {
        onClose();
      }
    };

    if (open) {
      modal.showModal();
      document.addEventListener('keydown', handleKeyDown);
    } else {
      modal.close();
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

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
