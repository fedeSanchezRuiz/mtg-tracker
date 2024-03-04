import { useState, useEffect } from 'react';
import Link from 'next/link';
import classes from './products-list.module.css';

export default function ProductsList() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProductList(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <h1>Products List</h1>
      <ul>
        {loading ? (
          <p style={{ color: 'darkred', textAlign: 'center' }}>
            Loading...
          </p>
        ) : (
          productList.map((product) => (
            <li key={product.name}>
              <Link href={`/products/${product.id}`}>
                <div>{product.name}</div>
                <img
                  src={product.source}
                  alt={product.name}
                  // width={300}
                  // height={300}
                />
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
