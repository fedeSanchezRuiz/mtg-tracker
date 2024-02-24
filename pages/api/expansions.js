import { fetchData } from '@/helpers/db-functions';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(422).json({ message: 'Invalid request.' });
    return;
  }

  try {
    await fetchData('expansions', res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
