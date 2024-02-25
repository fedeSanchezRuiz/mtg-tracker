import Image from 'next/image';
import Link from 'next/link';
import classes from './footer.module.css';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <nav>
          <h3>Store Information</h3>
          <ul>
            <li>Address</li>
            <li>E-mail</li>
            <li>Schedule</li>
          </ul>
        </nav>
        <nav>
          <h3>Navigation</h3>
          <ul>
            <li>
              <Link href='/search'>Advanced Search</Link>
            </li>
            <li>
              <Link href='/sell'>Sell Your Cards</Link>
            </li>
            <li>
              <Link href='/products'>Special Deals</Link>
            </li>
            <li>
              <Link href='/support/how-to-buy'>How to Buy?</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <h3>Information</h3>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/support/payment-methods'>
                Payment Methods
              </Link>
            </li>
            <li>
              <Link href='/support/shipping-information'>
                Shipping Information
              </Link>
            </li>
            <li>
              <Link href='/support/grading-guide'>
                Grading Guide
              </Link>
            </li>
          </ul>
        </nav>
        <nav className={classes['media-container']}>
          <h3>Social Media</h3>
          <ul className={classes['social-media']}>
            <li>
              <button>
                <Image
                  src='/images/social-media/facebook-icon.png'
                  alt='Facebook logo'
                  height={32}
                  width={32}
                />
              </button>
            </li>
            <li>
              <button>
                <Image
                  src='/images/social-media/instagram-icon.png'
                  alt='Instagram logo'
                  height={32}
                  width={32}
                />
              </button>
            </li>
            <li>
              <button>
                <Image
                  src='/images/social-media/twitch-icon.png'
                  alt='Twitch logo'
                  height={32}
                  width={32}
                />
              </button>
            </li>
            <li>
              <button>
                <Image
                  src='/images/social-media/discord-icon.png'
                  alt='Discord logo'
                  height={32}
                  width={32}
                />
              </button>
            </li>
          </ul>
        </nav>
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
      </div>
      <div className={classes['bottom-links']}>
        <p>
          <Link href='/terms-of-service'>Terms of Service</Link>{' '}
          | <Link href='/privacy-policy'>Privacy Policy</Link> |{' '}
          <Link href='/return-policy'>Return Policy</Link>
        </p>
        <p>
          Ⓒ 1999-2024 MTG Tracker Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
