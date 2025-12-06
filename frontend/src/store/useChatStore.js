import {create} from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import {useAuthStore} from './useAuthStore'


export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers : async() => {
        set({isUserLoading: true})
        try {
            const res = await axiosInstance.get("messages/users")
            set({users: res.data})
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }finally{
            set({isUserLoading: false})
        }
    },

    getMessages : async(userId) => {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`messages/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },

    sendMessages: async(messageData) => {
        const {selectedUser,messages} = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
            set({messages: [...messages,res.data]})
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
    },


    setSelectedUser: (selectedUser)=>set({selectedUser}),

    subscribeToMessage: () => {
        const {selectedUser} = get()
        if(!selectedUser) return
        const socket = useAuthStore.getState().socket
        socket.on("newMessage",(message)=>{
            if(message.senderId !== selectedUser._id) return
            const {messages} = get()
            set({messages: [...messages,message]})
        })
    },

    unsubscribeFromMessage: () => {
        const {selectedUser} = get()
        if(!selectedUser) return
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    },

}))