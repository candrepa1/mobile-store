import React from "react";
import { getFirebaseAuth } from "../firebase";
import FirebaseContext from "../contexts/FirebaseContext";

const FirebaseProvider = ({ children }) => {
    const auth = getFirebaseAuth();

    return <FirebaseContext.Provider value={{ auth }}>
        {children}
    </FirebaseContext.Provider>
}

export default FirebaseProvider;