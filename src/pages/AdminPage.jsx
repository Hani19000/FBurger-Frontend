import { useParams } from "react-router-dom";

const AdminPage = () => {
  const params = useParams();
    return (
        <div>
            <h1>Dashboard Item Detail Page</h1>
            <p>You are viewing details for dashboard item ID: {params.profileId}</p>
        </div>
    );
};
export default AdminPage;