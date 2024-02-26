import Link from 'next/link';
import { useState, useEffect, useRef, useContext } from 'react';
import UserIcon from '../icons/user';
import SearchIcon from '../icons/search';
import CartIcon from '../icons/cart';
import MoneyIcon from '../icons/money';
import classes from './main-nav.module.css';
import LoggedInContext from '@/store/loggedIn-context';
import CartContext from '@/store/cart-context';
import UserProgressContext from '@/store/user-progress-context';
import Button from '../ui/button';
// import { useSession, signOut } from 'next-auth/react';

export default function MainNavigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { loggedIn } = useContext(LoggedInContext);
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce(
    (totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity;
    },
    0
  );

  function showCartHandler() {
    userProgressCtx.showCart();
  }
  // const { data: session, status } = useSession();

  // console.log(session);
  // console.log(status);

  // const logoutHandler = () => {
  //   signOut();
  // };

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link href='/'>
            <img
              src='https://images.vexels.com/media/users/3/189965/isolated/preview/2fa8f49698539df25f9d1bb0ea22e5d9-toy-dice-icon.png'
              alt='dice'
              width={50}
              height={50}
            />
            MTG Tracker
          </Link>
        </div>
        <nav>
          <ul className={classes.navigation}>
            <li className={classes.search}>
              <div
                className={classes['search-container']}
                ref={dropdownRef}
              >
                <button onClick={handleToggleDropdown} className={classes['drop-button']}>
                  All Products
                </button>
                {showDropdown && (
                  <div className={classes.dropdown}>
                    <Link
                      href='/expansions'
                      onClick={handleToggleDropdown}
                      key='expansions'
                    >
                      Magic Sets
                    </Link>
                    <Link
                      href='/products'
                      onClick={handleToggleDropdown}
                      key='products'
                    >
                      Products
                    </Link>
                  </div>
                )}
                <input
                  type='text'
                  id='search'
                  name='search'
                  placeholder='Search Tracker'
                />
                <button className={classes.glass}>
                  <SearchIcon />
                </button>
              </div>
            </li>
            <div className={classes['items-container']}>
              <li>
                <div className={classes.items}>
                  <Link href='/login'>
                    {!loggedIn ? 'LOGIN' : 'LOGOUT'}
                    <UserIcon />
                  </Link>
                </div>
                {/* {loggedIn && (
                <button onClick={logoutHandler}>
                  <div className={classes.items}>LOGOUT</div>
                  <div>
                    <UserIcon />
                  </div>
                </button>
              )}
              {!loggedIn && (
                <Link href='/login'>
                  <div className={classes.items}>LOGIN</div>
                  <div>
                    <UserIcon />
                  </div>
                </Link>
              )} */}
              </li>
              <li>
                <div className={classes.items}>
                  {/* <Link href='/cart'> */}
                  <Button
                    textOnly
                    onClick={showCartHandler}
                  >
                    BUY ({totalCartItems})
                    <CartIcon />
                  </Button>
                  {/* </Link> */}
                </div>
              </li>
              <li>
                <div className={classes.items}>
                  <Link href='/sell'>
                    SELL
                    <MoneyIcon />
                  </Link>
                </div>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}
