import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import FirebaseContext from "../contexts/FirebaseContext";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth } = useContext(FirebaseContext);
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const registerUser = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            const token = await user.getIdToken();
            if (token) {
                navigate("/products");
                setUser({ token, email })
            }
        } catch (e) {
            setError(e.code)
        }
    }

    const errorMap = {
        'auth/email-already-exists': 'Email already exists',
        'auth/invalid-email': 'Invalid email',
        'auth/weak-password': 'Password must have at least 6 characters'
    }

    return <div id="login">
        <input className="input-login" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input className="input-login" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        {error && <p className="error">{errorMap[error]}</p>}
        <button className="button-login" onClick={registerUser}>Register</button>
        <p>Already an user? <Link to="/login">Sign in</Link></p>
    </div>
};

export default Register;