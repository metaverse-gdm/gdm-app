import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, password } = req.body;

  if (req.method === 'POST') {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);  // エラーログを出力
      res.status(500).json({ error: 'User creation failed', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
