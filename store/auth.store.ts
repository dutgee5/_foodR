import {create} from 'zustand'
import {Models} from "react-native-appwrite";
import {getCurrentUser} from "@/lib/appwrite";


interface User extends Models.Document {
    name: string;
    email: string;
    avatar: string;
}

type AuthStore = {
    isAuth: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuth: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setIsLoading: (loading: boolean) => void;

    fetchAuthUser: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({

    /*
    bears: 0, // Initial state in the store (number)
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })), // increase the number
    removeAllBears: () => set({ bears: 0 }), // remove number
    updateBears: (newBears) => set({ bears: newBears }), // update
    */

    isAuth: false,
    user: null,
    isLoading: true,

    setIsAuth: (value) => set({isAuth: value}),

    setUser: (user) => set({user}),
    setIsLoading: (value) => set({isLoading: value}),

    fetchAuthUser: async () => {
        set({isLoading: true});

        try {
            // await fetch("/api/auth/user");
            const user = await getCurrentUser()

            if (user) set({isAuth: true, user: user as User})
            else set({isAuth: false, user: null})
        } catch (e) {
            set({isLoading: false, user: null,});
        } finally {
            set({isLoading: false});
        }
    }
}))

export default useAuthStore;