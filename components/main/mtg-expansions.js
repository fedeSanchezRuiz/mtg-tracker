import { useState, useEffect } from 'react';
import Link from 'next/link';
import classes from './mtg-expansions.module.css';

export default function MtgExpansions() {
  const [lastExpansions, setLastExpansions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/expansions');
        const data = await response.json();
        setLastExpansions(data.expansions);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <h1>Last MTG Expansions</h1>
      <ul>
        {loading ? (
          <p style={{ color: 'darkred', textAlign: 'center' }}>
            Loading...
          </p>
        ) : (
          lastExpansions.map((set) => (
            <li key={set.name}>
              <Link href={`/expansions/${set.id}`}>
                <div className={classes.title}>
                  <h2>{set.name}</h2>
                  <img
                    src={set.source}
                    alt={set.name}
                  />
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
