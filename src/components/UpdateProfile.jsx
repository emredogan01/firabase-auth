import { useState } from "react"
import { update, auth, resetPassword } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

export default function UpdateProfile() {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)

    const [displayName, setDisplayName] = useState(user.displayName || "");
    const [avatar, setAvatar] = useState(user.photoURL || "");
    const [password, setPassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        await update({
            displayName,
            photoURL: avatar
        })
        dispatch(login({
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            emailVerified: auth.currentUser.emailVerified,
            photoUrl: auth.currentUser.photoURL,
            uid: auth.currentUser.uid,
        }))
    }

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        const result = await resetPassword(password)
        if (result) {
            setPassword("")
        }
    }

    return (
        <div className="grid gap-y-10">
            <form onSubmit={handleSubmit} className="grid gap-y-4 py-4">
                <h1 className="text-xl font bold mb-4">Profili Güncelle</h1>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Ad, Soyad;
                    </label>
                    <div className="mt-1">
                        <input
                            placeholder="Emilia Clark"
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus: focus:border-indigo-500 block w-full sm: text-sm border-gray-700"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Fotoğraf URL;
                    </label>
                    <div className="mt-1">
                        <input
                            placeholder="Emilia Clark"
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus: focus:border-indigo-500 block w-full sm: text-sm border-gray-700"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit" placeholder="login" className="disabled:opacity-60 cursor-pointer mt-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Güncelle
                </button>
            </form>

            <form onSubmit={handleResetSubmit} className="grid gap-y-4 py-4">
                <h1 className="text-xl font bold mb-4">Profili Güncelle</h1>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Şifreyi Güncelle;
                    </label>
                    <div className="mt-1">
                        <input
                            placeholder="Zorunlu Değil!"
                            type="password"
                            className="shadow-sm focus:ring-indigo-500 focus: focus:border-indigo-500 block w-full sm: text-sm border-gray-700"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    disabled={!password}
                    type="submit"
                    placeholder="login"
                    className="disabled:opacity-60 cursor-pointer mt-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Güncelle
                </button>
            </form>

        </div>
    )
}