import { hashPassword } from '@/helpers/authenticate';
import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.i41rsvv.mongodb.net/`;
const dbName = process.env.mongodb_database;
const collectionName = 'user-data';

async function saveUserData(data) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const existingUser = await collection.findOne({
      email: data.email,
    });
    if (existingUser) {
      res.status(422).json({ message: 'User already exists!' });
      return;
    }
    const result = await collection.insertOne(data);
  } finally {
    await client.close();
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(422).json({ message: 'Invalid request.' });
    return;
  }

  try {
    const email = req.body.email;
    const password = req.body.password;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 6
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const hashedPassword = hashPassword(password);

    const userData = {
      email,
      password: await hashedPassword,
    };

    await saveUserData(userData);

    res
      .status(201)
      .json({ message: 'Welcome to MTG Tracker!', userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
}
