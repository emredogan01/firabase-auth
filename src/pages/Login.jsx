import { login } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {


    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(email, password);
        if (user) {
            navigate("/", {
                replace: true
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto grid top-y-4 py-4 ">

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <div className="mt-1">
                    <input
                        placeholder="yourmail@exapmle.com"
                        type="email"
                        className="shadow-sm focus:ring-indigo-500 focus: focus:border-indigo-500 block w-full sm: text-sm border-gray-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Parola
                </label>
                <div className="mt-1">
                    <input
                        placeholder="*******"
                        type="password"
                        className="shadow-sm focus:ring-indigo-500 focus: focus:border-indigo-500 block w-full sm: text-sm border-gray-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <button disabled={!email || !password} type="submit" placeholder="login" className="disabled:opacity-60 cursor-pointer mt-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Giriş Yap</button>
        </form>
    )
}