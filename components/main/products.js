import { useState, useEffect } from 'react';
import Link from 'next/link';
import classes from './products.module.css';
import ArrowLeftIcon from '../icons/arrow-left';
import ArrowRightIcon from '../icons/arrow-right';
import { currencyFormatter } from '@/helpers/formatting-price';

export default function Products() {
  const itemsPerPage = 5;
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(
    productList.length / itemsPerPage
  );

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

  useEffect(() => {
    // Automatic slide every 4 seconds
    const intervalId = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
    }, 4000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentPage, totalPages]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(totalPages, prevPage + 1)
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = productList.slice(
    startIndex,
    endIndex
  );

  return (
    <>
      <h1 className={classes.title}>Hot Buy List</h1>
      <div className={classes.background}>
        <div className={classes.pagination}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon />
          </button>
        </div>
        {loading ? (
          <p style={{ color: 'darkred', textAlign: 'center' }}>
            Loading...
          </p>
        ) : (
          <ul className={classes.list}>
            {visibleProducts.map((product, index) => (
              <li
                key={index}
                className={classes.items}
              >
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.source}
                    alt={product.name}
                  />
                  <h3>
                    {product.name} -{' '}
                    {currencyFormatter.format(product.price)}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className={classes.pagination}>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </>
  );
}
