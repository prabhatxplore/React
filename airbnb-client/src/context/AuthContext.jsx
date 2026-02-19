import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/session-user", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data.user)
            })// user exist only set otherwise set null
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)