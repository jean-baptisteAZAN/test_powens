import { Transaction} from "@/types/Transactions";

export async function getTransactions(accessToken: string): Promise<Transaction[]> {
    const startDate = "2024-07-01";
    const endDate = "2024-07-31";
    const limit = 100;

    const transactionsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/transactions?start_date=${startDate}&end_date=${endDate}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const transactionsData = await transactionsResponse.json();
    const transactions = transactionsData.transactions;
    return transactions.filter((transaction: Transaction) => {
        return (
            transaction.original_wording.includes("PRELEVEMENT") ||
            transaction.type === "loan_repayment" ||
            transaction.type === "bank"
        );
    });
}
