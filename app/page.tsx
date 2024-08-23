'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const connectBank = () => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    const connectUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/webview/connect?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = connectUrl;
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (code) {
      const fetchAccessToken = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/access`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: decodeURIComponent(code),
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          }),
        });

        const data = await response.json();
        const accessToken = data.access_token;

        localStorage.setItem('accessToken', accessToken);
        fetchAccounts(accessToken);
      };

      fetchAccessToken();
    }
  }, []);

  const fetchAccounts = async (accessToken) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const accounts = await response.json();
    console.log('Accounts:', accounts);
  };

  return (
      <div>
        <button onClick={connectBank}>Connect to Bank</button>
      </div>
  );
}
