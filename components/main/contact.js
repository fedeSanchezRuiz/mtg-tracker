import Link from 'next/link';
import Button from '../ui/button';
import classes from './contact.module.css';

export default function ContactAbout() {
  return (
    <>
      <Link href='/support'>
        <div className={classes.delivery}>
          <img
            src='https://cdn-icons-png.flaticon.com/512/66/66841.png'
            alt='delivery'
            width={80}
            height={80}
          />
          <h2>Free domestic shipping on orders over $50</h2>
        </div>
      </Link>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <img
            src='https://cdn2.inkarnate.com/cdn-cgi/image/width=1800,height=1400/https://inkarnate-api-as-production.s3.amazonaws.com/TKFNqL2xdVGvVPSYWiDuMz'
            alt='Middle Earth Map'
          />
          <div
            className={`${classes.text} ${classes['first-text']}`}
          >
            <h2>Visit our friendly local game store</h2>
            <p>
              In sharing our love of games in Buenos Aires and
              the rest of Argentina, we want to spark empathy,
              creativity, and fun in our communities. From
              recommending titles for game night at home to
              hosting in-store events, we want to help you build
              your gaming community.
            </p>
            <Link href='/contact-us'>
              <Button>CONTACT US</Button>
            </Link>
          </div>
        </div>
        <div className={classes.container}>
          <div
            className={`${classes.text} ${classes['second-text']}`}
          >
            <h2>Enjoy games through human connection</h2>
            <p className={classes.paragraph}>
              Our two stores, in Federal Capital City and Buenos
              Aires City, are filled to the brim with board
              games, card games, jigsaw puzzles, and more. Still
              can't find what you're looking for? Drop us a line
              and we'll try to track it down for you!
            </p>
            <Link href='/about-us'>
              <Button>ABOUT US</Button>
            </Link>
          </div>
          <img
            src='https://cdn.shoplightspeed.com/shops/623437/files/47035907/690x450x1/image.jpg'
            alt='Putting together a puzzle'
          />
        </div>
      </div>
    </>
  );
}
