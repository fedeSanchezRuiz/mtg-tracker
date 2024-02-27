import { useContext } from 'react';
import { useRouter } from 'next/router';
import { currencyFormatter } from '@/helpers/formatting-price';
import Link from 'next/link';
import CartIcon from '@/components/icons/cart';
import HeartIcon from '@/components/icons/heart-icon';
import BellIcon from '@/components/icons/bell-icon';
import BackArrowIcon from '@/components/icons/back-arrow';
import Head from 'next/head';
import CartContext from '@/store/cart-context';
import UserProgressContext from '@/store/user-progress-context';
import classes from './selected-card.module.css';

export default function SelectedCard({ card }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const router = useRouter();
  const selectedExpansion = router.query.expansionId;

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

  function addCardToCartHandler() {
    cartCtx.addItem(card);
  }

  function showCartHandler() {
    userProgressCtx.showCart();
  }

  return (
    <>
      <Head>
        <title>{`MTG Tracker - ${card.name}`}</title>
        <meta
          name='description'
          content={card.name}
        />
      </Head>
      <Link href={`/expansions/${selectedExpansion}`}>
        <div className={classes['going-back']}>
          <BackArrowIcon />
          <p>{`Back to ${selectedExpansion}`}</p>
        </div>
      </Link>
      <div className={classes.container}>
        <div>
          <h1>{card.name}</h1>
          <img
            src={card.image}
            alt={card.name}
            width={430}
            height={580}
          />
        </div>
        <div className={classes.box}>
          <div className={classes.text}>
            <div>
              <h4>Edition: {card.expansion}</h4>
            </div>
            <div>
              <h4>Description:</h4>
              <p>{card.name}</p>
            </div>
          </div>
          <div className={classes.choices}>
            <div className={classes.price}>
              <h2>{currencyFormatter.format(card.price)}</h2>
              {/* <p> - 5 Available</p> */}
            </div>
            <div className={classes.icons}>
              <div>
                <CartIcon />
              </div>
              <h3>
                <button onClick={addCardToCartHandler}>
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
