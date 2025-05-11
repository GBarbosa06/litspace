import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { db } from '../firebase/config';
import { app } from '../firebase/config';
import { useState, useEffect, use } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    const auth = getAuth(app);

    const checkIfIsCancelled = () => {
        if (cancelled) {
            return;
        }
    };

    //register
    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, { displayName: data.displayName });
            setLoading(false);
            return user;
        } catch (error) {
            console.log(error.message);
            let systemErrorMEssage;
            if(error.message.includes("Password")){
                systemErrorMEssage = "A senha precisa conter pelo menos 6 caracteres.";
            }
            else if(error.message.includes("email-already")){
                systemErrorMEssage = "E-mail já cadastrado";
            }
            else{
                systemErrorMEssage = "Ocorreu um erro, por favor tente mais tarde."
            }
            setError(systemErrorMEssage);
            setLoading(false);
        }
    };

    //login
    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            let systemErrorMEssage;
            if(error.message.includes("user-not-found")){
                systemErrorMEssage = "Usuário não encontrado.";
            }
            else if(error.message.includes("wrong-password")){
                systemErrorMEssage = "Senha incorreta.";
            }
            else if(error.message.includes("credential")){
                systemErrorMEssage = "E-mail ou senha inválidos.";
            }
            else{
                systemErrorMEssage = "Ocorreu um erro, por favor tente mais tarde."
            }
            setError(systemErrorMEssage);
            setLoading(false);
        }
    }

    //logout
    const logout = () => {
        checkIfIsCancelled();
        setError(null);
        setLoading(true);

        try {
            signOut(auth);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setError("Ocorreu um erro ao sair.");
            setLoading(false);
        }
    };

    return { auth, createUser, login, logout, error, loading };
}