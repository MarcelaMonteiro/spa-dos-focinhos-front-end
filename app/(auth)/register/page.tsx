"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!name || !email || !password || !confirmPassword) {
			setError("Preencha todos os campos");
			return;
		}

		if (password.length < 6) {
			setError("A senha deve ter pelo menos 6 caracteres");
			return;
		}

		if (password !== confirmPassword) {
			setError("As senhas não coincidem");
			return;
		}

		setError("");
		setLoading(true);

		try {
			const res = await fetch(
				"https://spa-dos-focinhos.onrender.com/auth/signup",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name,
						email,
						password,
					}),
				},
			);

			const data = await res.json();

			if (!res.ok) {
				setError(data.message || "Erro ao criar conta");
				return;
			}

			router.push("/login");
		} catch {
			setError("Erro de conexão com o servidor");
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="bg-[#F4ECE6] h-screen flex flex-col items-center">
			<div className="mt-10">
				<Link href="/">
					<Image src="/spalogo.png" alt="Logo" width={200} height={200} />
				</Link>
			</div>
			<div className="flex flex-col justify-center items-center gap-4">
				<h2 className="text-[#6A5A4E] text-3xl mt-10">Crie sua conta</h2>
				<p className="text-[#8B7766] ">
					Preencha os campos abaixo para criar a sua conta
				</p>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center items-center gap-4 mt-5">
					<div className="relative">
						<User
							className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B99577]"
							size={18}
						/>
						<input
							type="text"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
								setError("");
							}}
							placeholder="Nome completo"
							className="w-full pl-12 pr-12 py-3 rounded-xl border border-[#E1D2C6]
                  text-[#6A5A4E] focus:outline-none focus:ring-2 focus:ring-[#B99577]"
						/>
					</div>
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
							className="w-full pl-12 pr-12 py-3 rounded-xl border border-[#E1D2C6]
                  text-[#6A5A4E] focus:outline-none focus:ring-2 focus:ring-[#B99577]"
						/>
					</div>

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
							className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B99577] cursor-pointer"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
					<div className="relative">
						<Lock
							className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B99577]"
							size={18}
						/>
						<input
							type={showPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
								setError("");
							}}
							placeholder="Confirme sua senha"
							className="w-full pl-12 pr-12 py-3 rounded-xl border border-[#E1D2C6]
                  text-[#6A5A4E] focus:outline-none focus:ring-2 focus:ring-[#B99577]"
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B99577] cursor-pointer"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
					{error && (
						<p className="text-red-500 text-sm text-center mt-2">{error}</p>
					)}
					<button
						type="submit"
						disabled={loading}
						className="bg-[#B99577] hover:bg-[#A88465] text-white rounded-xl w-full cursor-pointer h-12 font-semibold"
					>
						Criar conta
					</button>
				</div>
			</form>
		</section>
	);
}
