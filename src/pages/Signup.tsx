import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";

const Signup = () => {

    interface IFormSignup {
        email: string,
        password: string,
        confirmPassword: string
    }

    const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?. &])[A-Za-z\d@$!%*?. &]{8,}$/;

    const [isPasswordOk, setIsPasswordOk] = useState<boolean>(false);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormSignup>()

    const handleClick = (data: IFormSignup) => {
        console.log(data)

        if (data.password === data.confirmPassword) {
            //send http request !
            //response from server
            // if ok => redirection to signin page
            //else => display alert !
            navigate('/signin');
        } else {
            setIsPasswordOk(true);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-[#0b0b0b] via[#0f0f0f] to-black flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-[#0f0f0f]/95 text-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                    <div className="text-[#e50914] font-extrabold text-3xl tracking-tight">MyVOD</div>
                    <h2 className="text-white text-lg font-semibold mt-2">Créer un compte</h2>
                    <p className="text-gray-400 text-sm mt-1">Rejoignez MyVOD pour regarder vos films et séries préférés.</p>
                </div>

                {isPasswordOk && (
                    <div className="w-full max-w-md mb-4">
                        <div role="alert" className="bg-red-50 border border-red-400 text-red-800 px-4 py-3 rounded-md flex items-start gap-3">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="font-semibold">Erreur d'inscription</p>
                                <p className="text-sm">Les mots de passe ne correspondent pas. Vérifiez vos informations.</p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(handleClick)} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Adresse e‑mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="exemple@domaine.com"
                            {...register("email", {
                                required: "Adresse mail obligatoire", pattern: { value: emailRegex, message: "Adresse mail non valide" }

                            })}
                            className="w-full bg-[#121212] border border-[#232323] text-white placeholder-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            minLength={6}
                            placeholder="Mot de passe"
                            {...register("password", {
                                required: "Mot de passe requis", minLength: {
                                    value: 8, message: "Minimum 8 caractères"
                                }, pattern: {
                                    value: passwordRegex,
                                    message: "Le mod de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial."
                                }
                            })}


                            className="w-full bg-[#121212] border border-[#232323] text-white placeholder-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirm" className="block text-sm font-medium text-gray-300 mb-2">
                            Confirmez le mot de passe
                        </label>
                        <input
                            id="confirm"
                            type="password"
                            minLength={6}
                            placeholder="Confirmez le mot de passe"
                            {...register("confirmPassword", { required: true })}
                            className="w-full bg-[#121212] border border-[#232323] text-white placeholder-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-[#e50914] hover:bg-[#cf0714] text-white font-semibold py-2 rounded-md transition-colors"
                    >
                        S'inscrire
                    </button>
                </form>

                <div className="text-xs text-gray-400 mt-4 text-center">
                    En vous inscrivant, vous acceptez les conditions d'utilisation.
                </div>
            </div>
        </div>
    );
};

export default Signup;