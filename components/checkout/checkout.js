import Card from '../layout/card';
import Link from 'next/link';
import classes from './checkout.module.css';
import Button from '../ui/button';
import { useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { currencyFormatter } from '@/helpers/formatting-price';
import CartContext from '@/store/cart-context';
import LoggedInContext from '@/store/loggedIn-context';
import UserProgressContext from '@/store/user-progress-context';
import NotificationContext from '@/store/notification-context';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const loggedInCtx = useContext(LoggedInContext);
  const userProgressCtx = useContext(UserProgressContext);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const companyNameRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipCodeRef = useRef();
  const countryRef = useRef();
  const phoneNumberRef = useRef();

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) =>
      totalPrice + item.quantity * item.price,
    0
  );

  const totalCartItems = cartCtx.items.reduce(
    (totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity;
    },
    0
  );

  function openModalHandler() {
    userProgressCtx.showCart();
  }

  async function submitHandler(event) {
    event.preventDefault();

    const firstNameInput = firstNameRef.current.value;
    const lastNameInput = lastNameRef.current.value;
    const companyNameInput = companyNameRef.current.value;
    const address1Input = address1Ref.current.value;
    const address2Input = address2Ref.current.value;
    const cityInput = cityRef.current.value;
    const stateInput = stateRef.current.value;
    const zipCodeInput = zipCodeRef.current.value;
    const countryInput = countryRef.current.value;
    const phoneNumberInput = phoneNumberRef.current.value;

    const purchaseData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      companyName: companyNameInput,
      address1: address1Input,
      address2: address2Input,
      city: cityInput,
      state: stateInput,
      zipCode: zipCodeInput,
      country: countryInput,
      phoneNumber: phoneNumberInput,
    };

    try {
      notificationCtx.showNotification({
        title: 'Processing purchase order...',
        message: 'Please wait...',
        status: 'pending',
      });
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify(purchaseData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Your order has been sent successfully!',
        status: 'success',
      });
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
      <div className={classes.container}>
        <div className={classes.buttons}>
          <Link href='/'>Continue Shopping</Link>
          <Link
            href='#'
            onClick={openModalHandler}
          >
            Edit Shopping Cart
          </Link>
        </div>
        <h4 className={classes.username}>
          Hi {loggedInCtx.email}, welcome to MTG Tracker!
        </h4>
        <div className={classes['total-info']}>
          <form
            className={classes.form}
            onSubmit={submitHandler}
          >
            <div className={classes.sharedspace}>
              <div>
                <label htmlFor='FirstName'>First Name</label>
                <input
                  id='FirstName'
                  type='text'
                  ref={firstNameRef}
                  required
                />
              </div>
              <div>
                <label htmlFor='LastName'>Last Name</label>
                <input
                  id='LastName'
                  type='text'
                  ref={lastNameRef}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor='CompanyName'>Company Name (Optional)</label>
              <input
                id='CompanyName'
                type='text'
                placeholder='For business use'
                ref={companyNameRef}
              />
            </div>
            <div>
              <label htmlFor='Address1'>Address 1</label>
              <input
                id='Address1'
                type='text'
                placeholder='Street, P.O. Box'
                ref={address1Ref}
                required
              />
            </div>
            <div>
              <label htmlFor='Address2'>
                Address 2 (Optional)
              </label>
              <input
                id='Address2'
                type='text'
                placeholder='Company, c/o, Apt #'
                ref={address2Ref}
              />
            </div>
            <div className={classes.sharedspace}>
              <div>
                <label htmlFor='City'>City</label>
                <input
                  id='City'
                  type='text'
                  ref={cityRef}
                  required
                />
              </div>
              <div>
                <label htmlFor='State/Province'>
                  State/Province
                </label>
                <input
                  id='State/Province'
                  type='text'
                  ref={stateRef}
                  required
                />
              </div>
              <div>
                <label htmlFor='ZipCode'>Zip Code</label>
                <input
                  id='ZipCode'
                  type='number'
                  ref={zipCodeRef}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor='Country'>Country</label>
              <input
                id='Country'
                type='text'
                ref={countryRef}
                required
              />
            </div>
            <div>
              <label htmlFor='PhoneNumber'>Phone Number</label>
              <input
                id='PhoneNumber'
                type='number'
                ref={phoneNumberRef}
                required
              />
            </div>
            <div className={classes['cart-summary']}>
              <h4>Cart Summary ({totalCartItems})</h4>
              <p>
                Subtotal: {currencyFormatter.format(cartTotal)}
              </p>
              <Button className={classes.checkout}>
                Send Order
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}
