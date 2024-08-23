'use client';
import {LogOutIcon} from "lucide-react";

export default function LogoutButton() {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
    };

    return (
        <button type="button" onClick={handleLogout} className="btn preset-filled-primary-100-900">
            <span><LogOutIcon/></span>
            <span>Disconnect</span>
        </button>
    )
}
