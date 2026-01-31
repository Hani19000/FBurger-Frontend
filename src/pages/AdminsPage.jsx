import { Link } from 'react-router-dom';
function AdminsPages () {
  const admins = [1, 2, 3, 4, 5];

  return (
    <div>
      <h1>Dashboard Page</h1>
        {admins.map((profile) => (
          <Link key={profile} to={`/admins/${profile}`}>
            Profile {profile}
          </Link>
        ))}
    </div>
  );
};

export default AdminsPages;
