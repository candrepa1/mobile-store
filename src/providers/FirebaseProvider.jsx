import React from "react";
import { getFirebaseAuth, getFirestoreDb } from "../firebase";
import FirebaseContext from "../contexts/FirebaseContext";

const FirebaseProvider = ({ children }) => {
    const auth = getFirebaseAuth();
    const db = getFirestoreDb();

    return <FirebaseContext.Provider value={{ auth, db }}>
        {children}
    </FirebaseContext.Provider>
}

export default FirebaseProvider;