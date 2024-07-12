import { useState, useEffect, useContext } from 'react';
import Notification from '../ui/notification';
import MainNavigation from './main-nav';
import NotificationContext from '@/store/notification-context';
import MyCart from '../cart/my-cart';
import UserProgressContext from '@/store/user-progress-context';
import CartContext from '@/store/cart-context';
import MediaIcons from '../ui/media-icons';
import CartReminder from '../ui/cart-reminder';

export default function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const activeNotification = notificationCtx.notification;
  const userProgress = userProgressCtx.progress;
  const { notification, showNotification } = cartCtx;

  const [searchQuery, setSearchQuery] = useState('');

  const searchHandler = (query) => {
    setSearchQuery(query);
    console.log(query);
  };

  return (
    <>
      <MainNavigation searchHandler={searchHandler} />
      <MediaIcons />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      {notification && (
        <CartReminder
          message={notification}
          // onClose={() => showNotification(null)}
          onClose={() =>
            dispatchCartAction({ type: 'HIDE_NOTIFICATION' })
          }
        />
      )}
      {userProgress && <MyCart />}
    </>
  );
}
