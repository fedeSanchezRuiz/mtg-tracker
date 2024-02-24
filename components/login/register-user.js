import Button from '../ui/button';
import Card from '../layout/card';
import Link from 'next/link';
import classes from './register-user.module.css';

export default function RegisterUser() {
  return (
    <Card>
      <h2 className={classes.h2}>Registration</h2>
      <div className={classes['input-box']}>
        <label htmlFor='Email'>Email Address</label>
        <input
          type='email'
          id='Email'
          placeholder='Enter Email'
          required
        />
      </div>
      <div className={classes['input-box']}>
        <label htmlFor='Confirm-email'>Confirm Email</label>
        <input
          type='email'
          id='Confirm-email'
          placeholder='Confirm Email'
          required
        />
      </div>
      <div className={classes['input-box']}>
        <label htmlFor='Password'>Password</label>
        <input
          type='password'
          id='Password'
          placeholder='Enter Password'
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
          placeholder='Confirm Password'
          required
        />
      </div>
      <div
        className={`${classes.checkbox} ${classes['first-checkbox']}`}
      >
        <input
          type='checkbox'
          id='agreeToPrivacyPolicy'
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
        />
        <label htmlFor='subscribeToNewsletter'>
          Sign me up for your weekly newsletter with Magic news,
          articles, brews, deals, and more.
        </label>
      </div>
      <Button>Submit</Button>
      <div className={classes.link}>
        <Link href='/login'>Already member? Sign in here!</Link>
      </div>
    </Card>
  );
}
