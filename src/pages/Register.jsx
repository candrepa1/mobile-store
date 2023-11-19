import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import FirebaseContext from "../contexts/FirebaseContext";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth } = useContext(FirebaseContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const registerUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential, 'userCredential!')
            })
            .catch((error) => { });
    }

    return <>
        <input placeholder="email" value={email} onChange={handleEmailChange} />
        <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} />
        <button onClick={registerUser}>register</button>
    </>
}

export default Register;