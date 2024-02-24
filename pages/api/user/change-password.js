import {
  hashPassword,
  verifyPassword,
} from '@/helpers/authenticate';
import { fetchData } from '@/helpers/db-functions';
import { getServerSession } from 'next-auth';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    res.status(422).json({ message: 'Invalid request!' });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'User not validated!' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const data = await fetchData('user-data', res);
  const user = await data.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(
    oldPassword,
    currentPassword
  );

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const passwordUpdate = await user.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  client.close();
  res.status(200).message({ message: 'Password updated!' });
}
