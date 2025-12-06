import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";


export default function HomePage() {
    const {selectedUser} = useChatStore()
    return <>
        <div className="bg-base-200">
            <div className="pt-16">
                <div className="bg-base-100 w-full h-[calc(100vh-4rem)]">
                    <div className="flex h-full overflow-hidden">
                        <Sidebar/>
                        {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
                    </div>
                </div>
            </div>
        </div>
    </>
}