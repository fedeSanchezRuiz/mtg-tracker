import { useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import NotificationContext from '@/store/notification-context';
import LoggedInContext from '@/store/loggedIn-context';
import Button from '../ui/button';
import Card from '../layout/card';
import Link from 'next/link';
import classes from './register-user.module.css';

export default function RegisterUser() {
  const emailRef = useRef();
  const emailConfirmRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  const loggedInCtx = useContext(LoggedInContext);
  const router = useRouter();

  async function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredConfirmedEmail = emailConfirmRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmedPassword =
      passwordConfirmRef.current.value;

    const registrationData = {
      email: enteredEmail,
      confirmedEmail: enteredConfirmedEmail,
      password: enteredPassword,
      confirmedPassword: enteredConfirmedPassword,
    };

    try {
      notificationCtx.showNotification({
        title: 'Creating user...',
        message: 'Please wait...',
        status: 'pending',
      });
      const response = await fetch('/api/auth/registration', {
        method: 'POST',
        body: JSON.stringify(registrationData),
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
    <Card>
      <h2 className={classes.h2}>Registration</h2>
      <form
        onSubmit={submitFormHandler}
        className={classes.form}
      >
        <div className={classes['input-box']}>
          <label htmlFor='Email'>Email Address</label>
          <input
            type='email'
            id='Email'
            name='email'
            placeholder='Enter Email'
            ref={emailRef}
            required
          />
        </div>
        <div className={classes['input-box']}>
          <label htmlFor='Confirm-email'>Confirm Email</label>
          <input
            type='email'
            id='Confirm-email'
            name='confirm-email'
            placeholder='Confirm Email'
            ref={emailConfirmRef}
            required
          />
        </div>
        <div className={classes['input-box']}>
          <label htmlFor='Password'>Password</label>
          <input
            type='password'
            id='Password'
            name='password'
            placeholder='Enter Password'
            ref={passwordRef}
            required
          />
        </div>
        <div className={classes['input-box']}>
          <label htmlFor='Confirm-password'>
            Re-enter Password
          </label>
          <input
            type='password'
            id='Confirm-password'
            name='confirm-password'
            placeholder='Confirm Password'
            ref={passwordConfirmRef}
            required
          />
        </div>
        <div
          className={`${classes.checkbox} ${classes['first-checkbox']}`}
        >
          <input
            type='checkbox'
            id='agreeToPrivacyPolicy'
            required
          />
          <label htmlFor='agreeToPrivacyPolicy'>
            I agree to Card Kingdom's{' '}
            <span className={classes.link}>
              <Link href='/'>Privacy Policy</Link>
            </span>{' '}
            and{' '}
            <span className={classes.link}>
              <Link href='/'>Terms of Service</Link>
            </span>
            .
          </label>
        </div>
        <div
          className={`${classes.checkbox} ${classes['second-checkbox']}`}
        >
          <input
            type='checkbox'
            id='subscribeToNewsletter'
            required
          />
          <label htmlFor='subscribeToNewsletter'>
            Sign me up for your weekly newsletter with Magic
            news, articles, brews, deals, and more.
          </label>
        </div>
        <Button>Submit</Button>
        <div className={classes.link}>
          <Link href='/login'>
            Already member? Sign in here!
          </Link>
        </div>
      </form>
    </Card>
  );
}
