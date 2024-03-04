import { useContext, useState } from 'react';
import { currencyFormatter } from '@/helpers/formatting-price';
import Link from 'next/link';
import CartIcon from '@/components/icons/cart';
import HeartIcon from '@/components/icons/heart-icon';
import BellIcon from '@/components/icons/bell-icon';
import classes from './selected-product.module.css';
import PlusIcon from '@/components/icons/plus-icon';
import MinusIcon from '@/components/icons/minus-icon';
import BackArrowIcon from '@/components/icons/back-arrow';
import CartContext from '@/store/cart-context';
import UserProgressContext from '@/store/user-progress-context';
import Head from 'next/head';

export default function SelectedProduct({ product }) {
  const [toggleDescription, setToggleDescription] =
    useState(false);
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce(
    (totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity;
    },
    0
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) =>
      totalPrice + item.quantity * item.price,
    0
  );

  function toggleDescriptionHandler() {
    setToggleDescription((prev) => !prev);
  }

  function addProductToCartHandler() {
    cartCtx.addItem(product);
  }

  function showCartHandler() {
    userProgressCtx.showCart();
  }

  return (
    <>
      <Head>
        <title>{`MTG Tracker - ${product.name}`}</title>
        <meta
          name='description'
          content={product.name}
        />
      </Head>
      <Link href='/products'>
        <div className={classes['going-back']}>
          <BackArrowIcon />
          <p>Back to products</p>
        </div>
      </Link>
      <div className={classes.container}>
        <div className={classes.text}>
          <div className={classes.name}>
            <h2>{product.name}</h2>
          </div>
          <Link
            href='#'
            onClick={toggleDescriptionHandler}
          >
            <div className={classes.description}>
              <h2>Decription</h2>
              {toggleDescription ? <MinusIcon /> : <PlusIcon />}
            </div>
          </Link>
          <div className={classes.choices}>
            <div className={classes.price}>
              <h2>{currencyFormatter.format(product.price)}</h2>
              {/* <p> - 5 Available</p> */}
            </div>
            <div className={classes.icons}>
              <div>
                <CartIcon />
              </div>
              <h3>
                <button onClick={addProductToCartHandler}>
                  Add to Cart
                </button>
              </h3>
            </div>
            <div className={classes.icons}>
              <div>
                <HeartIcon />
              </div>
              <h3>
                <Link href='#'>Add to WishList</Link>
              </h3>
            </div>
            <div className={classes.icons}>
              <div>
                <BellIcon />
              </div>
              <h3>
                <Link href='/support/restock-notice'>
                  Restock Notice
                </Link>
              </h3>
            </div>
          </div>
        </div>
        <img
          src={product.source}
          alt={product.name}
        />
        <div className={classes.checkout}>
          <h2>Shopping Cart</h2>
          <h4>({totalCartItems} items)</h4>
          <div className={classes['total-price']}>
            <h4>Subtotal:</h4>
            <p>{currencyFormatter.format(cartTotal)}</p>
          </div>
          <h3>
            <Link
              href='#'
              onClick={showCartHandler}
            >
              View Cart
            </Link>{' '}
            | <Link href='/checkout'>Checkout</Link>
          </h3>
        </div>
      </div>
    </>
  );
}
