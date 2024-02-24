import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.i41rsvv.mongodb.net/`;
const dbName = process.env.mongodb_database;

export async function fetchData(collectionName, res) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const data = await collection.find({}).toArray();

    res.status(200).json({ [collectionName]: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
