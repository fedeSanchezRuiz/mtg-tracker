import { useRef } from 'react';
import Card from '../layout/card';
import classes from './get-password.module.css';

export default function ForgotPassword(props) {
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    enteredEmail = emailRef.current.value;
    enteredOldPassword = oldPasswordRef.current.value;
    enteredNewPassword = newPasswordRef.current.value;

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <Card>
      <form
        className={classes.form}
        onSubmit={submitHandler}
      >
        <h2>My Account / Forgot My Password</h2>
        <p>
          Please enter your registered email address below. A new
          TEMPORARY password will be emailed to you immediately
          after submitting this form. You may change this
          password by logging in and selecting 'Change Password'
          option.
          <span className={classes['last-line']}>
            If you do not receive your temporary password within
            a few minutes, be sure to check your spam folder!
          </span>
        </p>
        <div className={classes['input-box']}>
          <label htmlFor='Email'>Email:</label>
          <input
            type='email'
            id='Email'
            placeholder='Email'
            ref={emailRef}
            required
          />
        </div>
      </form>
    </Card>
  );
}
