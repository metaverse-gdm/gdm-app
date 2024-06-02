import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;
    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          author: { connect: { email: session.user.email } }
        }
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Post creation failed' });
    }
  } else if (req.method === 'PUT') {
    const { id, title, content } = req.body;
    try {
      const post = await prisma.post.update({
        where: { id },
        data: { title, content }
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Post update failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
