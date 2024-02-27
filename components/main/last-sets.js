// import Link from 'next/link';
import PreorderButton from '../ui/preorder-button';
import classes from './last-sets.module.css';

export default function LastSets() {
  return (
    <div className={classes.expansions}>
      <div>
        {/* <Link href='/expansions/ravnica-remastered'> */}
        <div className={classes['button-container']}>
          <PreorderButton href='/expansions/ravnica-remastered'>
            AVAILABLE NOW
          </PreorderButton>
        </div>
        <img
          src='https://m.media-amazon.com/images/S/aplus-media-library-service-media/ce5d4574-a360-456e-88ad-60aacd0b40db.__CR0,0,970,600_PT0_SX970_V1___.jpg'
          alt='Ravnica Remastered'
          width={600}
          height={400}
        />
        <h1>RAVNICA REMASTERED</h1>
        <span />
        <h4>
          Take a tour of the best that Magic's multicolor-themed
          city has to offer with Ravnica Remastered!
        </h4>
        {/* </Link> */}
      </div>
      <div>
        {/* <Link href='/expansions/lost-caverns-of-ixalan'> */}
        <div className={classes['button-container']}>
          <PreorderButton href='/expansions/lost-caverns-of-ixalan'>
            AVAILABLE NOW
          </PreorderButton>
        </div>
        <img
          src='https://m.media-amazon.com/images/S/aplus-media-library-service-media/493838f0-848b-45c1-93e9-71b0021e2ab5.__CR0,0,970,600_PT0_SX970_V1___.jpg'
          alt='Ravnica Remastered'
          width={600}
          height={400}
        />
        <h1>LOST CAVERNS OF IXALAN</h1>
        <span />
        <h4>
          Begin the adventure of multiple lifetimes with
          Dinosaurs and Ancient Gods guarding untold treasures in
          the Lost Caverns of Ixalan!
        </h4>
        {/* </Link> */}
      </div>
    </div>
  );
}
