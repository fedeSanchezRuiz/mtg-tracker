import MtgExpansions from '@/components/main/mtg-expansions';

export default function ExpansionsPage({ lastSets }) {
  return <MtgExpansions lastSets={lastSets} />;
}

export async function getStaticProps() {
  try {
    const expansionsResponse = await fetch('api/expansions');
    const expansionsData = await expansionsResponse.json();
    const expansions = expansionsData.expansions || [];

    return {
      props: { lastSets: expansions },
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      props: { lastSets: [] },
    };
  }
}
