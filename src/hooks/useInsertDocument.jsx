import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  setDoc,
  Timestamp,
  doc,
} from "firebase/firestore";

const initialState = {
  loading: false,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "SUCCESS":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (collectionName) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const safeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (docData, customId = null) => {
    safeDispatch({ type: "LOADING" });

    try {
      const document = { ...docData, createdAt: Timestamp.now() };

      if (customId) {
        const docRef = doc(db, collectionName, customId);
        await setDoc(docRef, document);
      } else {
        await addDoc(collection(db, collectionName), document);
      }

      safeDispatch({ type: "SUCCESS" });
    } catch (error) {
      safeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};
