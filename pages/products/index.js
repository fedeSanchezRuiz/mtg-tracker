import ProductsList from '@/components/main/products-list';

export default function ProductsPage({ productList }) {
  return <ProductsList productList={productList} />;
}

export async function getStaticProps() {
  try {
    const productsResponse = await fetch('/api/products');
    const productsData = await productsResponse.json();
    const products = productsData.products || [];
    return {
      props: { productList: products },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { productList: [] },
    };
  }
}
