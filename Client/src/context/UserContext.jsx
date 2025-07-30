import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const res = await fetch("http://localhost:3000/auth/me", {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log("running times");

        fetchUser();
    }, []);

    return <UserContext.Provider value={{ user, fetchUser, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
