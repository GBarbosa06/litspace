import { useState,useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "INSERTED_DOCUMENT":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const useCreteReview = (docCollection) => {
    const  [response, dispatch] = useReducer(insertReducer, initialState);

    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action)
        }
    }

    const createReview = async(review) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        })
        try {
            const newReview = {...review, createdAt: Timestamp.now()}

            const insertedReview = await addDoc(
                collection(db, docCollection),
                newReview
            )
            checkCancelBeforeDispatch({
                type: "INSERTED_DOCUMENT",
                payload: insertedReview,
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])
    return { insertedReview, response }
}