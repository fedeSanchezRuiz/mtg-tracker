import Header from '@/components/main/header';
import Products from '@/components/main/products';
import LastSets from '@/components/main/last-sets';
import ContactAbout from '@/components/main/contact';

export default function HomePage({ lastSets, productList }) {
  return (
    <>
      <Header lastSets={lastSets} />
      <Products productList={productList} />
      <LastSets />
      <ContactAbout />
    </>
  );
}

export async function getStaticProps() {
  try {
    const productsResponse = await fetch('/api/products');
    const productsData = await productsResponse.json();
    const products = productsData.products || [];

    const expansionsResponse = await fetch('/api/expansions');
    const expansionsData = await expansionsResponse.json();
    const expansions = expansionsData.expansions || [];

    return {
      props: {
        lastSets: expansions,
        productList: products,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        lastSets: [],
        productList: [],
      },
      revalidate: 3600,
    };
  }
}
