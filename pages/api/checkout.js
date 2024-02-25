import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.i41rsvv.mongodb.net/`;
const dbName = process.env.mongodb_database;
const collectionName = 'purchase-data';

async function saveUserData(purchaseData) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    await collection.insertOne(purchaseData);
  } finally {
    await client.close();
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const purchaseData = req.body;
      await saveUserData(purchaseData);
      res
        .status(201)
        .json({ message: 'Purchase data saved successfully!' });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Internal Server Error!' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
