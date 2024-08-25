import {Account} from "@/types/Account";

export async function getAccountData(accessToken: string): Promise<Account[]> {
    const accountsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/accounts`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await accountsResponse.json();
    return data.accounts;
}
