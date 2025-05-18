import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "FETCHED_DOCS":
      return { documents: action.payload, loading: false, error: null };
    case "ERROR":
      return { documents: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useFetchDocuments = (docCollection, searchField = null, searchValue = null) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    documents: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "LOADING" });

    let q = collection(db, docCollection);

    if (searchField && searchValue) {
      q = query(q, where(searchField, "==", searchValue), orderBy("createdAt", "desc"));
    } else {
      q = query(q, orderBy("createdAt", "desc"));
    }


    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "FETCHED_DOCS", payload: docs });
      },
      (error) => {
        dispatch({ type: "ERROR", payload: error.message });
      }
    );

    return () => unsubscribe();
  }, [docCollection, searchField, searchValue]);

  return state;
};
