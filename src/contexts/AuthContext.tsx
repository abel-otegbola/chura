'use client'
import { createContext, useEffect, useState, type ReactNode } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { ID } from "appwrite";
import { useLocalStorage } from '../customHooks/useLocaStorage';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite/appwrite';
import type { User } from '../interface/auth';

type values = {
    user: User;
    popup: { type: string, msg: string };
    loading: boolean;
    login: (email: string, password: string, callbackURL: string) => void; 
    signup: (email: string, password: string, callbackURL: string) => void;
    logOut: () => void;
}

const AuthContext = createContext({} as values);

export { AuthContext }

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function login(email: string, password: string, callbackURL: string) {
        setLoading(true)
        await account.createEmailPasswordSession(email, password)
            .then(response => {
            setPopup({ type: "success", msg: "Login successful" })
            setUser(response)
            navigate(callbackURL || "/account")
            setLoading(false)
        })
        .catch(error => {
            setLoading(true)
            setPopup({ type: "error", msg: error.message })
            setLoading(false)
        })
    }

    async function signup(email: string, password: string, callbackURL: string) {
        setLoading(true)
        console.log(email)
        await account.create(ID.unique(), email, password)
        .then(() => {
            setPopup({ type: "success", msg: "Registered successful" })
            login(email, password, callbackURL);
        })
        .catch(error => {
            setLoading(true)
            setPopup({ type: "error", msg: error.message })
            setLoading(false)
        })
    }

    async function logOut() {
        await account.deleteSession("current");
        setUser(null);
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch {
            setUser(null);
        }
    }

    useEffect(() => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(popup.type === "success") {
            toast.success(popup.msg)
        }
        else if(popup.type === "error") {
            toast.error(popup.msg)
        }
    }, [popup])

    return (
        <AuthContext.Provider value={{ user, popup, loading, login, signup, logOut }}>
            <Toaster containerClassName="p-8" />
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;