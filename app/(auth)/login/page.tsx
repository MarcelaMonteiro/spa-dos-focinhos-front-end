"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function Login() {
	const router = useRouter();
	const { isAuthenticated, login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	/* 🔒 Bloqueia a página se já estiver autenticada */
	useEffect(() => {
		if (isAuthenticated) {
			router.replace("/dashboard");
		}
	}, [isAuthenticated, router]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");

		if (!email || !password) {
			setError("Preencha email e senha");
			return;
		}

		try {
			setLoading(true);

			const res = await fetch("http://localhost:3001/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				setError("Email ou senha inválidos");
				return;
			}

			/* ✅ token correto */
			await login(data.accessToken);

			/* ✅ redirect direto, sem depender de estado assíncrono */

			router.replace("/dashboard");
		} catch {
			setError("Erro de conexão");
		} finally {
			setLoading(false);
		}
	}

	/* evita render enquanto redireciona */
	if (isAuthenticated) return null;

	return (
		<section className="bg-[#F4ECE6] h-screen flex flex-col justify-center items-center">
			<div className="-mt-20">
				<Link href="/">
					<Image
						src="/spalogo.png"
						alt="Logo"
						width={200}
						height={200}
						priority
					/>
				</Link>
			</div>

			<div
				className="bg-[#EFE4DB] shadow-[0_20px_40px_rgba(0,0,0,0.06)]
        w-[350px] md:w-[450px] rounded-3xl p-4 mt-4"
			>
				<div className="flex flex-col items-center gap-2">
					<h2 className="text-[#6A5A4E] text-2xl font-bold">
						Bem-vindo de volta!
					</h2>
					<p className="text-[#8B7766]">Faça login para continuar</p>
				</div>

				<div className="bg-[#FBF7F4] p-9 mt-6 rounded-2xl">
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-5">
							{/* EMAIL */}
							<div className="relative">
								<Mail
									className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B99577]"
									size={18}
								/>
								<input
									type="email"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										setError("");
									}}
									placeholder="Digite o seu e-mail"
									className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E1D2C6]
                  text-[#6A5A4E] focus:outline-none focus:ring-2 focus:ring-[#B99577]"
								/>
							</div>

							{/* SENHA */}
							<div className="relative">
								<Lock
									className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B99577]"
									size={18}
								/>
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										setError("");
									}}
									placeholder="Digite sua senha"
									className="w-full pl-12 pr-12 py-3 rounded-xl border border-[#E1D2C6]
                  text-[#6A5A4E] focus:outline-none focus:ring-2 focus:ring-[#B99577]"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B99577]"
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>

							{error && (
								<p className="text-red-500 text-sm text-center">{error}</p>
							)}

							<button
								type="submit"
								disabled={loading}
								className="bg-[#B99577] hover:bg-[#A88465] disabled:opacity-60
                text-white rounded-full h-12 font-semibold cursor-pointer"
							>
								{loading ? "Entrando..." : "Entrar"}
							</button>
						</div>
					</form>

					<div className="mt-4 text-center">
						<Link href="/register" className="text-[#8B7766] cursor-pointer">
							Não tem uma conta? Cadastre-se
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
