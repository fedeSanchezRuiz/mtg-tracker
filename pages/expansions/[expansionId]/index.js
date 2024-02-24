import fs from 'fs/promises';
import path from 'path';
import SelectedExpansion from '@/components/main/selected-expansion/selected-expansion';

export default function SelectedExpansionPage({
  selectedExpansion,
}) {
  return (
    <SelectedExpansion selectedExpansion={selectedExpansion} />
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

  const paths = data.lastSets.map((set) => ({
    params: { expansionId: set.id },
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

  const expansionId = params.expansionId;

  const selectedExpansion = data.lastSets.find(
    (expansion) => expansion.id === expansionId
  );

  return {
    props: {
      selectedExpansion,
    },
    revalidate: 3600,
  };
}
