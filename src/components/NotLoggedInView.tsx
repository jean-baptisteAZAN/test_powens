import LoginButton from "@/components/LoginButton";

export default function NotLoggedInView() {
    return (
        <div className={'flex flex-col items-center justify-center'}>
            <p>
                Vous n&lsquo;etes pas connecté.
            </p>
            <LoginButton/>
        </div>
    )
}
