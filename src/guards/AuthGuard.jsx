import { useEffect } from "react";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const AuthGuard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.token) {
            navigate('/login')
        }
    }, [user])

    return <Outlet />
}

export default AuthGuard