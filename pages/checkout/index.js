import { useContext } from 'react';
import { useRouter } from 'next/router';
import Checkout from '@/components/checkout/checkout';
import LoggedInContext from '@/store/loggedIn-context';

export default function CheckoutPage() {
  const { loggedIn } = useContext(LoggedInContext);
  const router = useRouter();

  if (!loggedIn) {
    router.push('/login');
    return null;
  }

  return <Checkout />;
}
