import Image from 'next/image';
import classes from './media-icons.module.css';

export default function MediaIcons() {
  return (
    <div className={classes['media-icons']}>
      <button className={classes['media-icon']}>
        <Image
          src='/images/social-media/facebook-icon.png'
          alt='Facebook logo'
          height={35}
          width={35}
        />
      </button>
      <button className={classes['media-icon']}>
        <Image
          src='/images/social-media/instagram-icon.png'
          alt='Instagram logo'
          height={35}
          width={35}
        />
      </button>
      <button className={classes['media-icon']}>
        <Image
          src='/images/social-media/twitch-icon.png'
          alt='Twitch logo'
          height={35}
          width={35}
        />
      </button>
      <button className={classes['media-icon']}>
        <Image
          src='/images/social-media/discord-icon.png'
          alt='Discord logo'
          height={35}
          width={35}
        />
      </button>
    </div>
  );
}
