import { Navigate, Outlet } from "react-router";

const AdminLayout = () => {
    const user = {admin: true}

    return (
        <div>
            {user.admin ? <Outlet/> : <Navigate to="/" />}
        </div>
    );
};

export default AdminLayout;