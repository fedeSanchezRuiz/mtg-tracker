import { useContext } from 'react';
import Notification from '../ui/notification';
import MainNavigation from './main-nav';
import NotificationContext from '@/store/notification-context';
import MyCart from '../cart/my-cart';
import UserProgressContext from '@/store/user-progress-context';
import MediaIcons from '../ui/media-icons';

export default function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const userProgressCtx = useContext(UserProgressContext);

  const activeNotification = notificationCtx.notification;
  const userProgress = userProgressCtx.progress;

  return (
    <>
      <MainNavigation />
      <MediaIcons />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      {userProgress && <MyCart />}
    </>
  );
}
