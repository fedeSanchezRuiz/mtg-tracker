import Link from 'next/link';
import ArrowRightIcon from '../icons/arrow-right';
import ArrowTopIcon from '../icons/arrow-top';
import classes from './lower-content.module.css';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export default function LowerContent() {
  return (
    <>
      <div className={classes.container}>
        <div>
          <h3>FREE SHIPPING</h3>
          <div className={classes.content}>
            <p>
              Free domestic shipping on singles orders over $50
            </p>
            <Link href='/support'>
              Learn More <ArrowRightIcon />
            </Link>
          </div>
        </div>
        <div>
          <h3>CUSTOMER SUPPORT</h3>
          <div className={classes.content}>
            <p>
              Our Customer Support team is always here to help.
            </p>
            <Link href='/support'>
              Submit Support Ticket <ArrowRightIcon />
            </Link>
          </div>
        </div>
        <div>
          <h3>SIGN-UP FOR EMAIL</h3>
          <div className={classes.content}>
            <p>
              Be the first to know about new releases,
              promotions, and exclusives!
            </p>
            <Link href='/login'>
              Sign me up! <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>

      <Link
        href='#'
        onClick={scrollToTop}
      >
        <div className={classes.bottom}>
          <ArrowTopIcon />
          <h2 className={classes.back}>BACK TO TOP</h2>
        </div>
      </Link>
    </>
  );
}
