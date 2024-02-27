import { hashPassword } from '@/helpers/authenticate';
import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.i41rsvv.mongodb.net/`;
const dbName = process.env.mongodb_database;
const collectionName = 'user-registration';

async function saveUserData(registrationData) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const existingUser = await collection.findOne({
      email: registrationData.email,
    });
    if (existingUser) {
      return { error: 'User already exists!' };
    }
    const result = await collection.insertOne(registrationData);
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
    const confirmedEmail = req.body.confirmedEmail;
    const password = req.body.password;
    const confirmedPassword = req.body.confirmedPassword;

    if (
      !email ||
      !email.includes('@') ||
      !confirmedEmail ||
      email !== confirmedEmail ||
      !password ||
      password.trim().length < 6 ||
      !confirmedPassword ||
      password !== confirmedPassword
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const registrationData = {
      email,
      password: hashedPassword,
    };

    await saveUserData(registrationData);

    res.status(201).json({ message: 'Welcome to MTG Tracker!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
}
