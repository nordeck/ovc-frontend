import { getAuthServerSession } from '@/lib/getAuthServerSession';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getAuthServerSession();

  const url = `${
    process.env.END_SESSION_URL
  }?id_token_hint=${session?.id_token}`;

  const response = await fetch(url);
  return NextResponse.json(null, { status: response.status });
}
