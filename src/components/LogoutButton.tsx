'use client';
import {LogOutIcon} from "lucide-react";

export default function LogoutButton() {

    return (
        <button type="button" className="btn preset-filled-primary-100-900">
            <span><LogOutIcon/></span>
            <span>Disconnect</span>
        </button>
    )
}
