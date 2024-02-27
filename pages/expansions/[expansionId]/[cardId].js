import fs from 'fs/promises';
import path from 'path';
import SelectedCard from '@/components/main/selected-card/selected-card';

export default function SelectedCardPage({ card }) {
  return <SelectedCard card={card} />;
}

export async function getStaticPaths() {
  const filePath = path.join(
    process.cwd(),
    'data',
    'dummy-backend.json'
  );
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const paths = data.lastSets.flatMap((set) =>
    set.cards.map((card) => ({
      params: { expansionId: set.id, cardId: card.id },
    }))
  );

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

  const selectedExpansion = data.lastSets.find(
    (expansion) => expansion.id === params.expansionId
  );

  const selectedCard = selectedExpansion.cards.find(
    (card) => card.id === params.cardId
  );

  return {
    props: {
      card: selectedCard,
    },
    revalidate: 3600,
  };
}
