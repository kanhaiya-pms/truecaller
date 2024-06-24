// pages/api/generate-verification-url.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const CALLBACK_URL = 'https://your-callback-url.com/api/truecaller-callback';
  const API_KEY = process.env.TRUECALLER_API_KEY;

  try {
    const response = await fetch('https://api4.truecaller.com/v1/verify/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        callbackUrl: CALLBACK_URL,
        // You can add additional parameters here as required
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ verificationUrl: data.verificationUrl });
    } else {
      res.status(500).json({ error: 'Failed to generate verification URL' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate verification URL' });
  }
};

export default handler;
