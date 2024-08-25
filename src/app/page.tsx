import { Suspense } from 'react';
import LogoutButton from "@/components/LogoutButton";
import { ProgressRing } from '@skeletonlabs/skeleton-react';
import { getAccountData } from "@/modules/getAccountData";
import PieChart from "@/components/PieChart";
import AccountInfo from "@/components/AccountInfo";
import NotLoggedInView from "@/components/NotLoggedInView";
import { Transaction } from "@/types/Transactions";
import { Account} from "@/types/Account";
import { getTransactions } from "@/modules/getTransactions";
import {getBearerToken} from "@/modules/getBearerToken";

export default async function Home ({ searchParams }: { searchParams: { code?: string } }) {
    const accessToken = searchParams.code ? await getBearerToken(searchParams.code) : null;
    let accounts: Account[] = [];
    let transactions: Transaction[] = [];

    if (accessToken) {
        accounts = await getAccountData(accessToken);
        transactions = await getTransactions(accessToken);
    }

    return (
        <div className={'w-screen flex flex-col items-center justify-center'}>
            <Suspense fallback={<ProgressRing value={null} size="size-14" meterStroke="stroke-tertiary-600-400" trackStroke="stroke-tertiary-50-950" />}>
                {accounts ? (
                    <div className={'flex flex-col items-center justify-center'}>
                        <h2 className={'h2'}>
                            Votre compte
                        </h2>
                        {accounts.map((account) => (
                            <AccountInfo key={account.id} account={account} />
                        ))}
                        {transactions.length > 0 ? (
                             <PieChart transactions={transactions} />
                        ) : (
                            <p>
                                Aucune transaction récurrente trouvée pour cette période.
                            </p>
                        )}
                        <LogoutButton/>
                    </div>
                ) : (
                    <NotLoggedInView/>
                )}
            </Suspense>
        </div>
    );
}
