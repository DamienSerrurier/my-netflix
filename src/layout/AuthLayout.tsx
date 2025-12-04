import { Navigate, Outlet } from "react-router";
import NavigationBar from "../components/NavigationBar";

const AuthLayout = () => {
    const user = { token: true, admin: true }

    return (
        <div>
            <NavigationBar isAdmin={user.admin} />
            {user.token ? <Outlet /> : <Navigate to="/signin" />}
        </div>
    );
};

export default AuthLayout;