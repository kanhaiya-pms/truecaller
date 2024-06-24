// src/app/api/generate-verification-url/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const CALLBACK_URL = 'https://your-callback-url.com/api/truecaller-callback';
  const API_KEY = process.env.TRUECALLER_API_KEY || "RlI9Ucfde97b3c5014018848ab57a3b6f4918";

  console.log("running code");

  // curl -X GET -H "Authorization: Bearer a3sAB0KnGANg4VZwIXfhUyFmPbzoONofl4FjIItac0JQSODp6niW8oBr33uOI-u7" -H "Cache-Control: no-cache" "https://profile4-noneu.truecaller.com/v1/default"

  try {
    const response = await fetch('https://profile4-noneu.truecaller.com/v1/default', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        callbackUrl: CALLBACK_URL,
      }),
    });

    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response status text:", response.statusText);
    console.log("Response data:", data);

    if (response.ok) {
      return NextResponse.json({ verificationUrl: data.verificationUrl });
    } else {
      console.error("Error response from Truecaller API:", data);
      return NextResponse.json({ error: 'Failed to generate verification URL', details: data }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in generating verification URL:", error);
    return NextResponse.json({ error: 'Failed to generate verification URL', details: error }, { status: 500 });
  }
}
