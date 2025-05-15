import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "FETCHED_DOCUMENT":
      return { documents: action.payload, loading: false, error: null };
    case "ERROR":
      return { documents: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useFetchDocuments = (docCollection) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    documents: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "LOADING" });

    const q = query(
      collection(db, docCollection),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "FETCHED_DOCUMENT", payload: docs });
      },
      (error) => {
        dispatch({ type: "ERROR", payload: error.message });
      }
    );

    return () => unsubscribe();
  }, [docCollection]);

  return state;
};
