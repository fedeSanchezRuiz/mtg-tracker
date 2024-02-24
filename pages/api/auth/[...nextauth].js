import { verifyPassword } from '@/helpers/authenticate';
import { fetchData } from '@/helpers/db-functions';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const userCollection = await fetchData('user-data');

          const user = await userCollection.findOne({
            email: credentials.email,
          });

          console.log(user);

          if (!user) {
            throw new Error('No user found!');
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error('Could not log user in!');
          }

          return { email: user.email };
        } catch (error) {
          console.error(error);
          throw new Error('Internal Server Error');
        }
      },
    }),
  ],
});
