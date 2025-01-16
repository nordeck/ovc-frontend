import { getAuthServerSession } from '@/lib/getAuthServerSession';
import { NextResponse } from 'next/server';

export type FetchRequest = {
  relativeUrl: string;
  requestInit?: RequestInit;
  allowedWithoutAuth?: boolean;
};

export async function fetchWithAuth({
  relativeUrl,
  requestInit,
  allowedWithoutAuth,
}: FetchRequest): Promise<Response> {
  const session = await getAuthServerSession();
  if (session === undefined && !allowedWithoutAuth) {
    return NextResponse.json(null, { status: 401 });
  }

  const token = session?.access_token;

  const fetchUrl = `${process.env.BACKEND_BASE_URL}/${relativeUrl}`;
  let response;

  try {
    response = await fetch(fetchUrl, {
      ...requestInit,
      headers: {
        Accept: 'application/json',
        Authorization: token ? 'Bearer ' + token : '',
        'Content-Type': 'application/json',
        ...requestInit?.headers,
      },
    });
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : String(error);
    console.error(`Could not fetch url ${fetchUrl} error message: ${message}`);
    return NextResponse.json(null, { status: 404 });
  }

  return response;
}
