import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post('/register', { name, email, password });
            alert("Registration successful");
            console.log("Registration successful:", response.data);
            setRedirect(true);
        } catch (error) {
            alert("Registration failed: " + error.message);
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-200 via-red-400 to-pink-100">
            <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
                <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Create Account</h1>
                <form onSubmit={registerUser} className="space-y-4">
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <input
                        type="email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <button className="w-full py-2 text-white rounded-lg shadow hover:bg-red-700 transition duration-300" style={{ backgroundColor: '#EF4444' }}>
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already a member?{" "}
                    <Link to="/login" className="text-red-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
