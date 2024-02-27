import { useState, useEffect } from 'react';
import Link from 'next/link';
import PreorderButton from '../ui/preorder-button';
import classes from './header.module.css';

export default function Header() {
  const [expansionsList, setExpansionsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredExpansions = expansionsList.filter(
    (set) => set.id !== 'murders-at-karlov-manor'
  );

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

  return (
    <div className={classes.image}>
      <PreorderButton
        href='/expansions/murders-at-karlov-manor'
        fontSize='30px'
        width='20rem'
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
    </div>
  );
}
