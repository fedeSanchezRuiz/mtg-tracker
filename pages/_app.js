import '@/styles/globals.css';
import Layout from '@/components/layout/layout';
import Head from 'next/head';
import Footer from '@/components/layout/footer';
import LowerContent from '@/components/main/lower-content';
import { NotificationContextProvider } from '@/store/notification-context';
import { LoggedInContextProvider } from '@/store/loggedIn-context';
import { CartContextProvider } from '@/store/cart-context';
import { UserProgressContextProvider } from '@/store/user-progress-context';

export default function App({ Component, pageProps }) {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <LoggedInContextProvider>
          <NotificationContextProvider>
            <Layout>
              <Head>
                <title>MTG Tracker</title>
                <meta
                  name='description'
                  content='MTG Tracker site for TCG Products'
                />
                <meta
                  name='viewport'
                  content='initial-scale=1, width=device-width'
                />
              </Head>
              <Component {...pageProps} />
              <LowerContent />
              <Footer />
            </Layout>
          </NotificationContextProvider>
        </LoggedInContextProvider>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}
