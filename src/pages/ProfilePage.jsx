import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import { LogOut, UserCircle2 } from "lucide-react"; // Optional: Use lucide-react for icons

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    if (!subpage) {
        subpage = 'profile';
    }

    if (!ready) {
        return <div className="text-center text-xl mt-20 text-gray-500">Loading ...</div>;
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <AccountNav />

            {subpage === 'profile' && (
                <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4">
                    <UserCircle2 className="h-20 w-20 text-gray-700" />
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user.name}!</h2>
                    <p className="text-gray-500">{user.email}</p>

                    <button
                        onClick={logout}
                        className="mt-6 flex items-center gap-2 px-6 py-3 bg-red-900 hover:bg-red-600 rounded-full shadow-md transition duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            )}

            {subpage === 'places' && <PlacesPage />}
        </div>
    );
}
