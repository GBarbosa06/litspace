import { useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children, value }) => {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthValue = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}