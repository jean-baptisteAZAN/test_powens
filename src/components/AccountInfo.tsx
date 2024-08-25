import {Account} from "@/types/Account";

export default function AccountInfo({ account }: { account: Account }) {
    return (
        <div>
            <p className={'h5'}>Name: {account.name}</p>
            <p className={'h5'}>Balance: {account.formatted_balance}</p>
            <p className={'h5'}>IBAN: {account.iban}</p>
            <p className={'h5'}>Type: {account.type}</p>
        </div>
    );
}
