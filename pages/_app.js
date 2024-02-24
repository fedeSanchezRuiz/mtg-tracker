import '@/styles/globals.css';
import Layout from '@/components/layout/layout';
import Head from 'next/head';
import Footer from '@/components/layout/footer';
import LowerContent from '@/components/main/lower-content';
import { NotificationContextProvider } from '@/store/notification-context';
import { LoggedInContextProvider } from '@/store/loggedIn-context';
import { CartContextProvider } from '@/store/cart-context';
import { UserProgressContextProvider } from '@/store/user-progress-context';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, session, pageProps }) {
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
}
