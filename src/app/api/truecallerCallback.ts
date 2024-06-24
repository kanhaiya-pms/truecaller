// pages/api/truecaller-callback.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query;

  if (token) {
    try {
      const response = await fetch(`https://api4.truecaller.com/v1/verify/${token}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        // Handle the data received from Truecaller
        res.status(200).json({ data });
      } else {
        res.status(500).json({ error: 'Failed to verify token' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify token' });
    }
  } else {
    res.status(400).json({ error: 'Token is missing' });
  }
};

export default handler;
