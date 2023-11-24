import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import FirebaseContext from "../contexts/FirebaseContext";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
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

    const registerUser = async () => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const token = await user.getIdToken();
        if (token) {
            navigate("/products");
        }
    }

    return <Container>
        <StyledInput placeholder="Email" value={email} onChange={handleEmailChange} />
        <StyledInput type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <StyledButton onClick={registerUser}>Register</StyledButton>
        <p>Already an user? <StyledLink to="/login">Sign in</StyledLink></p>
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

const StyledLink = styled(Link)`
    text-decoration: underline;
    color: blue;
    cursor: pointer;
`;

export default Register;