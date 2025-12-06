import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

export default function Navbar() {
    const { logout, authUser } = useAuthStore();
    return (
    <header className="bg-base-100 border-b-2 border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="mx-auto w-full px-3 sm:px-4 h-16">
        <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                    <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">ChatBox</h1>
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <Link to={"/settings"} className={`btn btn-md gap-2 transition-colors`}>
                    <Settings className="w-5 h-5" />
                    <h1><span className="hidden sm:inline text-lg">Settings</span></h1>
                    </Link>
                {authUser && (
                    <>
                    <Link to={"/profile"} className={`btn btn-md gap-2`}>
                        <User className="size-6" />
                        <span className="hidden sm:inline text-lg">Profile</span>
                    </Link>
                    <button className="flex gap-2 items-center text-lg btn btn-md" onClick={logout}>
                        <LogOut className="size-6" />
                        <span className="hidden sm:inline text-lg">Logout</span>
                    </button>
                    </>
                )}
            </div>
        </div>
      </div>
    </header>
  );
}