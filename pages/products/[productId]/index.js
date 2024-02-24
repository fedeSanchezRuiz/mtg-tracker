import fs from 'fs/promises';
import path from 'path';
import SelectedProduct from '@/components/main/selected-product/selected-product';

export default function SelectedProductPage({ product }) {
  return (
    <SelectedProduct product={product} />
  );
}

export async function getStaticPaths() {
  const filePath = path.join(
    process.cwd(),
    'data',
    'dummy-backend.json'
  );
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const paths = data.products.map((product) => ({
    params: { productId: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(
    process.cwd(),
    'data',
    'dummy-backend.json'
  );
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const productId = params.productId;

  const selectedProduct = data.products.find(
    (product) => product.id === productId
  );

  if (!selectedProduct) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: selectedProduct,
    },
  };
}
