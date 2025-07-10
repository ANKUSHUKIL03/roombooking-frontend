import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', {
                email,
                password
            });
            setUser(data);
            alert('Login successful!');
            setRedirect(true);
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Image Section */}
            <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://www.shutterstock.com/shutterstock/photos/685734484/display_1500/stock-vector-welcome-back-banner-685734484.jpg')" }}>
                
            </div>

            {/* Right Login Form */}
            <div className="flex w-full md:w-1/2 justify-center items-center p-8">
                <div className="w-full max-w-md space-y-6 bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Login to Your Account</h1>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <FaEnvelope className="text-gray-500 mr-2" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full focus:outline-none"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                            />
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full focus:outline-none"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                            />
                        </div>

                        <button className="w-full  hover:bg-red-500 py-2 rounded-lg shadow-md transition-all duration-300 text-white" style={{backgroundColor: '#1D4ED8'}}>
                            Login
                        </button>

                        <div className="text-center text-gray-500">
                            Don&apos;t have an account yet?{' '}
                            <Link className="underline text-blue-600" to={'/register'}>
                                Register now
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
