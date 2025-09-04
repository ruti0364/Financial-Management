import { useAuth } from 'context/AuthContext';
import { logout } from 'api/authApi';

export default function Profile() {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (!user) return <p>לא מחובר</p>;

  return (
    <div>
      <h2>שלום {user.firstName} {user.lastName}</h2>
      <p>{user.email}</p>
      <button onClick={handleLogout}>התנתקות</button>
    </div>
  );
}
