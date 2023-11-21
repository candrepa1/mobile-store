import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import FirebaseContext from "../contexts/FirebaseContext";
import styled from 'styled-components';

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

    return <Container>
        <StyledInput placeholder="Email" value={email} onChange={handleEmailChange} />
        <StyledInput placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
        <StyledButton onClick={loginUser}>Sign in</StyledButton>
        <p>Not an user? <StyledLink>Register</StyledLink></p>
    </Container>
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: center;
`;

const StyledInput = styled.input`
    height: 30px;
    margin-bottom: 20px;
    width: 100%;
`;

const StyledButton = styled.button`
    padding: 15px;
    background-color: #87e8a1;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;

const StyledLink = styled.a`
    text-decoration: underline;
    color: blue;
    cursor: pointer;
`;

export default Login;