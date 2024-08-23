import { Suspense } from 'react';
import LoginButton from "@/components/LoginButton";
import { ProgressRing } from '@skeletonlabs/skeleton-react';

interface Account {
    id: number;
    name: string;
    formatted_balance: string;
    iban: string;
    type: string;
}

async function fetchAccountsData(code: string): Promise<Account[] | null> {
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
    const accessToken = tokenData.access_token;

    const accountsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/accounts`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const accountsData = await accountsResponse.json();
    return accountsData.accounts || null;
}

export default async function Home({ searchParams }: { searchParams: { code?: string } }) {
    const accounts = searchParams.code ? await fetchAccountsData(searchParams.code) : null;

    return (
        <div className={'w-screen flex flex-col items-center justify-center'}>
            <Suspense fallback={<ProgressRing value={null} size="size-14" meterStroke="stroke-tertiary-600-400" trackStroke="stroke-tertiary-50-950" />}>
                {accounts ? (
                    <div>
                        <h2>Accounts:</h2>
                        {accounts.map((account) => (
                            <div key={account.id}>
                                <p>Name: {account.name}</p>
                                <p>Balance: {account.formatted_balance}</p>
                                <p>IBAN: {account.iban}</p>
                                <p>Type: {account.type}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={'flex flex-col items-center justify-center'}>
                        <p>No accounts found</p>
                        <LoginButton/>
                    </div>
                )}
            </Suspense>
        </div>
    );
}
