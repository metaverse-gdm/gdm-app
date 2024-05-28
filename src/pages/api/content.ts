// File: ./pages/api/content.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const filePath = path.join(process.cwd(), 'public/data/content.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const contents = JSON.parse(jsonData);

  if (req.method === 'POST') {
    const newContent = req.body;

    // Validate the new content
    if (!newContent.title || !newContent.description || !newContent.image) {
      return res.status(400).json({ message: 'Title, description, and image are required' });
    }

    // Assign a new ID to the content
    newContent.id = new Date().getTime().toString();

    contents.push(newContent);

    fs.writeFileSync(filePath, JSON.stringify(contents, null, 2));

    return res.status(201).json(newContent);
  } else if (req.method === 'GET') {
    return res.status(200).json(contents);
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
