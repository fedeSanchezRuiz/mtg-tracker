import { useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/ui/button';
import Link from 'next/link';
import NotificationContext from '@/store/notification-context';
import LoggedInContext from '@/store/loggedIn-context';
import classes from './login-form.module.css';

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  const loggedInCtx = useContext(LoggedInContext);
  const router = useRouter();

  async function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      notificationCtx.showNotification({
        title: 'Logging in...',
        message: 'Please wait...',
        status: 'pending',
      });
      const response = await fetch('/api/auth/login-logout', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      const data = await response.json();

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Welcome to MTG Tracker!',
        status: 'success',
      });
      loggedInCtx.logIn(true);
      router.push('/');
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
      console.error(error);
    }
  }

  return (
    <div className={classes.container}>
      <div className={`${classes.boxes} ${classes['left-box']}`}>
        <h1>Sign In</h1>
        <form onSubmit={submitFormHandler}>
          <div>
            <label htmlFor='email' />
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              ref={emailRef}
              required
            />
          </div>
          <div>
            <label htmlFor='password' />
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              ref={passwordRef}
              required
            />
          </div>
          <div>
            <Button
              type='submit'
              style={{ marginTop: '5%', marginBottom: '2%' }}
            >
              Sign Up
            </Button>
          </div>

          <h4>
            <Link href='/login/get-password'>
              Forgot your password?
            </Link>
          </h4>
        </form>
      </div>
      <div
        className={`${classes.boxes} ${classes['right-box']}`}
      >
        <h4>Not a registered user?</h4>
        <Link href='/login/register'>
          <Button
            style={{ marginTop: '5%', marginBottom: '2%' }}
          >
            Sign Up
          </Button>
        </Link>
        <p>
          Create a free account on MTG Tracker to speed checkout,
          support inquiries, review order status and history.
        </p>
      </div>
    </div>
  );
}
