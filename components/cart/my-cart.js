import { useContext } from 'react';
import { useRouter } from 'next/router';
import { currencyFormatter } from '@/helpers/formatting-price';
import CartContext from '@/store/cart-context';
import UserProgressContext from '@/store/user-progress-context';
import Modal from '../ui/modal';
import Button from '../ui/button';
import classes from './my-cart.module.css';

export default function MyCart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const router = useRouter();

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

  function closeCartHandler() {
    userProgressCtx.hideCart();
  }

  function checkoutHandler() {
    router.push('/checkout');
    userProgressCtx.hideCart();
  }

  return (
    <Modal
      className={classes.cart}
      open={userProgressCtx.progress === 'cart'}
      onClose={closeCartHandler}
    >
      <div className={classes['top-info']}>
        <h2>My Cart</h2>
        <h4>
          <img
            src='https://images.vexels.com/media/users/3/189965/isolated/preview/2fa8f49698539df25f9d1bb0ea22e5d9-toy-dice-icon.png'
            alt='dice'
            width={25}
            height={25}
          />
          MTG Tracker
        </h4>
      </div>
      <ul>
        {cartCtx.items.map((item) => (
          <li
            key={item.id}
            className={classes['cart-item']}
          >
            <div className={classes['your-purchase']}>
              <div className={classes['img-and-name']}>
                <img
                  src={item.image || item.source}
                  alt={item.name}
                  width={40}
                  height={50}
                />{' '}
                <div className={classes['inner-text']}>
                  <div>{item.name}</div>
                  <p>{item.quantity}</p>
                </div>
                <div className={classes.price}>
                  x {currencyFormatter.format(item.price)}
                </div>
              </div>
              <p className={classes['cart-item-actions']}>
                <button
                  textOnly
                  onClick={() => cartCtx.removeItem(item.id)}
                >
                  -
                </button>
                <button
                  textOnly
                  onClick={() => cartCtx.addItem(item)}
                >
                  +
                </button>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes['cart-total']}>
        <p>Subtotal:</p>
        <div>{currencyFormatter.format(cartTotal)}</div>
        <p>USD ({totalCartItems} items)</p>
      </div>
      <p className={classes['modal-actions']}>
        <Button
          onClick={closeCartHandler}
          className={classes.close}
        >
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={checkoutHandler}>
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}
