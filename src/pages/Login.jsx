import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import FirebaseContext from "../contexts/FirebaseContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth } = useContext(FirebaseContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential, 'loginUser!')
            })
            .catch((error) => { });
    }

    return <>
        <input placeholder="email" value={email} onChange={handleEmailChange} />
        <input placeholder="password" type="password" value={password} onChange={handlePasswordChange} />
        <button onClick={loginUser}>sign in</button>
        <button>register</button>
    </>
}

export default Login;