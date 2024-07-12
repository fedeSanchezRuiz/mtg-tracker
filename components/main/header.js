import { useState, useEffect } from 'react';
import Link from 'next/link';
import PreorderButton from '../ui/preorder-button';
import classes from './header.module.css';
import ArrowRightIcon from '../icons/arrow-right';

export default function Header() {
  const [expansionsList, setExpansionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonStyles, setButtonStyles] = useState({
    fontSize: '30px',
    width: '20rem',
  });

  const filteredExpansions = Array.isArray(expansionsList)
    ? expansionsList.filter(
        (set) => set.id !== 'murders-at-karlov-manor'
      )
    : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/expansions');
        const data = await response.json();
        setExpansionsList(data.expansions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateButtonStyles = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 600) {
        setButtonStyles({
          fontSize: '20px',
          width: '15rem',
        });
      } else {
        setButtonStyles({
          fontSize: '30px',
          width: '20rem',
        });
      }
    };

    updateButtonStyles();
    window.addEventListener('resize', updateButtonStyles);

    return () => {
      window.removeEventListener('resize', updateButtonStyles);
    };
  }, []);

  return (
    <div className={classes.image}>
      <PreorderButton
        href='/expansions/murders-at-karlov-manor'
        fontSize={buttonStyles.fontSize}
        width={buttonStyles.width}
      >
        PREORDER NOW
      </PreorderButton>
      <img
        src='https://images.ctfassets.net/s5n2t79q9icq/2CXySbvcEqJrQDEaaeYIiu/31eabfa67eab1fa51cb4aed8fcbbef28/9ukoMb8DTPSC.jpg'
        alt='Murderers at Karlov Manor'
      />
      <ul>
        {loading ? (
          <p style={{ color: 'darkred', textAlign: 'center' }}>
            Loading...
          </p>
        ) : (
          filteredExpansions.map((set) => (
            <li key={set.name}>
              <Link href={`/expansions/${set.id}`}>
                {set.name}
              </Link>
            </li>
          ))
        )}
      </ul>
      <Link
        href='/expansions'
        className={classes.link}
      >
        <h4>Go to Last MTG Expansions</h4>
        <ArrowRightIcon />
      </Link>
    </div>
  );
}
