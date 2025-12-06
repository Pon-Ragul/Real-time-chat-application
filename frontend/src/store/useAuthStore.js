import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';
export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.error('Error checking auth status:', error);
            set({ authUser: null})
        }
        finally{
            set({ isCheckingAuth: false });
        }
    },

    signup: async(data) => {
        set({ isSigningUp: true });
        try {
           const res = await axiosInstance.post('/auth/signup', data);
           set({ authUser: res.data });
           toast.success("Account created successfully"); 
           get().connectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message);
        }
        finally{
            set({ isSigningUp: false });
        }
    },

    login : async(data) => {
        set({ isLoggingIng: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message);   
        }
        finally{
            set({ isLoggingIng: false });
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)   
        }
    },


    updateProfilePic: async(data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile',data)
            set({ authUser: res.data })
            toast.success("Profile picture updated successfully");
        } catch (error) {
            console.error("Error updating profile picture:", error);
            toast.error(error?.response?.data?.msg || error.message);
        }
        finally{
            set({ isUpdatingProfile: false } )
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if(!authUser||get().socket?.connected) return
        const socket = io("http://localhost:5020", {
            query: { userId: authUser._id },
        });
        socket.connect()
        set({ socket:socket });
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },

    disconnectSocket: () => {
        if(get().socket?.connected){
            get().socket.disconnect();
            set({ socket: null });
        }
    },

    
}))