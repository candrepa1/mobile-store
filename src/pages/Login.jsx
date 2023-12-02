import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import FirebaseContext from "../contexts/FirebaseContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const loginUser = async () => {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const token = await user.getIdToken();
        console.log({ token, user }, 'loginUser!');
        if (token) {
            navigate("/products");
        }
    }

    return <div id="login">
        <input className="input-login" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input className="input-login" placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
        <button className="button-login" onClick={loginUser}>Sign in</button>
        <p>Not an user? <Link to="/register">Register</Link></p>
    </div>
};

export default Login;