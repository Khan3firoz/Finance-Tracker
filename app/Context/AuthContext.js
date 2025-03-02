"use client"; // Required for using context in Next.js App Router
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchUserDetails } from "../service/user.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Example state for a user

    const login = (token) => {
        Cookies.set("token", token, { expires: 7, path: "/" });
        debugger
        setUser({ token });
        window.location.replace("/");
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        window.location.replace("/login");
    };

    return (
        <AuthContext.Provider value={{login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
