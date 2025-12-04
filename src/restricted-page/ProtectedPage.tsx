import { Navigate, Outlet } from "react-router";

const ProtectedPage = () => {
    //access to context to get token !
    const user = { token: false }

    return (
        <div>
            {user.token ? <Outlet /> : <Navigate to="/signin" />}
        </div>
    );
};

export default ProtectedPage;