import LoginForm from '@/components/login/login-form';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';

export default function LoginPage() {
  // const { data: session } = useSession();
  // const router = useRouter();

  // if (session) {
  //   router.push('/');
  // } else {

  return <LoginForm />;
  //   }
}
