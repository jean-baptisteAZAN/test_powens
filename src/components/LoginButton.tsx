'use client';

export default function LoginButton() {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || '';
        const connectUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/webview/connect?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location.href = connectUrl;
    };

    return (
        <button type="button" onClick={handleLogin}  className="btn preset-filled">
            Connect
        </button>
    )
}
