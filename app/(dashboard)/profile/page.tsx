"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function ProfilePage() {
	const { user, logout, loading } = useAuth();
	const router = useRouter();

	if (loading) {
		return (
			<p className="text-center mt-10 text-[#8B7766]">Carregando perfil...</p>
		);
	}

	if (!user) {
		return (
			<p className="text-center mt-10 text-red-500">
				Você precisa estar logado.
			</p>
		);
	}

	function handleLogout() {
		logout();
		router.replace("/login");
	}

	return (
		<section className="relative h-[100vh] bg-[#F4ECE6] flex items-center justify-center overflow-hidden ">
			<Image
				src="/fundodashboard.png"
				alt="cachorrinho relaxando"
				fill
				priority
				className="object-cover z-0 blur-sm scale-110  pointer-events-none "
			/>{" "}
			<div className="absolute inset-0 bg-white/50 -z-10" />
			<div className="relative z-10 md:w-full w-[350] max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 -mt-40 ">
				<h1 className="text-2xl font-bold text-center text-[#5A4033]">
					Meu Perfil
				</h1>

				<div className="flex flex-col items-center gap-2">
					<div className="w-20 h-20 rounded-full bg-[#A98063] flex items-center justify-center text-white text-3xl font-bold">
						{user.name.charAt(0).toUpperCase()}
					</div>

					<p className="text-lg font-semibold text-[#4B3B2F]">{user.name}</p>

					<p className="text-sm text-gray-500">{user.email}</p>
				</div>

				<div className="border rounded-2xl p-4 space-y-2 bg-[#FAF6F2]">
					<p className="text-sm text-gray-700">
						<span className="font-semibold">ID:</span> {user.id}
					</p>

					<p className="text-sm text-gray-700">
						<span className="font-semibold">Nome:</span> {user.name}
					</p>

					<p className="text-sm text-gray-700">
						<span className="font-semibold">Email:</span> {user.email}
					</p>
				</div>

				<button
					onClick={handleLogout}
					className="w-full cursor-pointer bg-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
				>
					Sair da conta
				</button>
			</div>
		</section>
	);
}
