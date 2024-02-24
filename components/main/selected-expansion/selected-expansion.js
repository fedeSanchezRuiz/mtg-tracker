import { useContext } from 'react';
import BackArrowIcon from '@/components/icons/back-arrow';
import CartIcon from '@/components/icons/cart';
import Link from 'next/link';
import Head from 'next/head';
import classes from './selected-expansion.module.css';
import CartContext from '@/store/cart-context';
import { formatRevalidate } from 'next/dist/server/lib/revalidate';
import { currencyFormatter } from '@/helpers/formatting-price';

export default function SelectedExpansion({
  selectedExpansion,
}) {
  const { name, cards } = selectedExpansion;
  const cartCtx = useContext(CartContext);

  function addCardToCartHandler(card) {
    cartCtx.addItem(card);
  }

  return (
    <>
      <Head>
        <title>{`MTG Tracker - ${name}`}</title>
        <meta
          name='description'
          content={name}
        />
      </Head>
      <Link href='/expansions'>
        <div className={classes['going-back']}>
          <BackArrowIcon />
          <p>Back to expansions</p>
        </div>
      </Link>
      <div className={classes.container}>
        <h1>{name}</h1>
        <ul className={classes['all-cards']}>
          {cards.map((card) => (
            <li
              key={card.id}
              className={classes.card}
            >
              <Link
                href={`/expansions/${selectedExpansion.id}/${card.id}`}
              >
                <h3>{card.name}</h3>
                <img
                  src={card.image}
                  alt={card.name}
                  height={350}
                  width={260}
                />
              </Link>
              <div className={classes.cart}>
                <p>
                  Price:{currencyFormatter.format(card.price)}
                </p>
                <div>-</div>
                <div className={classes['inner-cart']}>
                  <CartIcon />
                  <button onClick={() => addCardToCartHandler(card)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
