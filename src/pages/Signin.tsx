import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

const Signin = () => {

    interface IFormSignin {
        email: string,
        password: string
    }

    const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormSignin>()

    const signin = (data: IFormSignin) => {
        console.log(data)
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    {/* Logo */}
                    <div className="mx-auto h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
                        <svg
                            className="h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-4 8-4 8-8M12 13v7m0 0H6m6 0h6" />
                        </svg>
                    </div>

                    <h2 className="mt-6 text-center text-3xl font-extrabold bg-black">
                        Se connecter
                    </h2>
                    <p className="mt-2 text-center text-sm bg-black">
                        Bienvenue — entrez vos identifiants pour continuer
                    </p>
                </div>

                <div className="bg-[#0f0f0f]/95 py-8 px-6 shadow rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(signin)} className="space-y-6" noValidate>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Adresse e‑mail
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register('email', { required: "Adresse mail requise", pattern: { value: emailRegex, message: "Adresse mail non valide" } })}
                                    className="w-full bg-[#121212] border border-[#232323] text-white placeholder-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
                                    placeholder="exemple@domaine.com"
                                />
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Mot de passe
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    {...register('password', { required: true })}
                                    className="w-full bg-[#121212] border border-[#232323] text-white placeholder-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
                                    placeholder="********"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-gray-600">Se souvenir de moi</span>
                            </label>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Mot de passe oublié?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full mt-2 bg-[#e50914] hover:bg-[#cf0714] text-white font-semibold py-2 rounded-md transition-colors"
                            >
                                Se connecter
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">ou</span>
                            </div>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-600">
                            Pas de compte ?{" "}
                            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                S'inscrire
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;