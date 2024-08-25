export async function getBearerToken(code: string): Promise<string> {
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/access`, {
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

    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
}
