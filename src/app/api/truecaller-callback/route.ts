// src/app/api/truecaller-callback/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (token) {
    try {
      const response = await fetch(`https://api4.truecaller.com/v1/verify/${token}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        // Handle the data received from Truecaller
        return NextResponse.json({ data });
      } else {
        return NextResponse.json({ error: 'Failed to verify token' }, { status: 500 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Failed to verify token' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
  }
}
