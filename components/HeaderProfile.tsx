"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function HeaderProfile() {
	const [open, setOpen] = useState(false);
	const { logout } = useAuth();
	const router = useRouter();

	function handleLogout() {
		logout();
		router.push("/login");
	}

	return (
		<header className="relative z-50 bg-[#F4ECE6]/80 backdrop-blur-md ">
			<nav className="flex items-center justify-between px-6 md:px-10 py-4 overflow-hidden">
				{/* Botão Mobile */}
				<button className="md:hidden" onClick={() => setOpen(!open)}>
					{open ? <X size={28} /> : <Menu size={28} />}
				</button>

				{/* Logo */}
				<Link href="/dashboard">
					<Image
						src="/spalogo.png"
						alt="Logo do Spa dos Focinhos"
						width={90}
						height={90}
					/>
				</Link>

				{/* Desktop Links */}
				<div className="hidden md:flex gap-6">
					<Link href="/dashboard" className="hover:text-[#8B6A4F]">
						Início
					</Link>

					<Link href="/appointments" className="hover:text-[#8B6A4F]">
						Meus agendamentos
					</Link>

					<Link href="/profile" className="hover:text-[#8B6A4F]">
						Perfil
					</Link>

					<button
						onClick={handleLogout}
						className="text-red-600 font-semibold hover:text-red-700"
					>
						Sair
					</button>
				</div>

				{/* Dropdown Mobile */}
				{open && (
					<div
						className="absolute top-full left-0 w-full z-50 md:hidden 
                          bg-[#F6F1EC] border-t border-[#E2D5C8]
                          flex flex-col items-center px-6 py-6 space-y-4 shadow-lg"
					>
						<Link href="/dashboard" onClick={() => setOpen(false)}>
							Início
						</Link>

						<Link href="/appointments" onClick={() => setOpen(false)}>
							Meus agendamentos
						</Link>

						<Link href="/profile" onClick={() => setOpen(false)}>
							Meu Perfil
						</Link>

						<button
							onClick={handleLogout}
							className="text-red-600 font-semibold"
						>
							Sair
						</button>
					</div>
				)}
			</nav>
		</header>
	);
}
