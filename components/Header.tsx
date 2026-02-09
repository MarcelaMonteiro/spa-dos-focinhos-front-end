"use client";

import { useState } from "react";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";

const dancingScript = Dancing_Script({
	subsets: ["latin"],
	weight: ["400", "600"],
});

export default function Header() {
	const [open, setOpen] = useState(false);
	const { token, logout } = useAuth();

	return (
		<header className="relative z-50 bg-[#FFF2E6]/50 backdrop-blur-md md:overflow-hidden">
			<nav className="w-screen  mx-auto md:px-10 px-6 py-2 flex  justify-between">
				<Link href="/">
					<Image
						src="/spalogo.png"
						alt="Spa dos Focinhos"
						width={130}
						height={20}
						className=""
					/>
				</Link>

				<div className="hidden md:flex gap-6 items-center text-sm text-[#2B2B2B]">
					<Link className=" font-title hover:text-[#8B6A4F]" href="/">
						Início
					</Link>
					<Link className="font-title hover:text-[#8B6A4F]" href="/about">
						Sobre
					</Link>
					<Link className="font-title hover:text-[#8B6A4F]" href="/services">
						Serviços
					</Link>
					{token ? (
						<div className="flex gap-4 items-center">
							<Link
								className="font-title bg-[#A98063] text-white px-4 py-2 rounded-full hover:bg-[#8B6A4F] transition"
								href="/dashboard"
							>
								Dashboard
							</Link>
							<button
								onClick={logout}
								className="px-4 py-2 rounded-full cursor-pointer hover:text-red-600 text-red-400 hover:bg-white/10 transition"
							>
								Sair
							</button>
						</div>
					) : (
						<Link
							className="font-title bg-[#A98063] text-white px-4 py-2 rounded-full hover:bg-[#8B6A4F] transition"
							href="/login"
						>
							Login
						</Link>
					)}
				</div>

				<button
					onClick={() => setOpen(!open)}
					className="md:hidden text-[#A98063]"
					aria-label="Abrir menu"
				>
					{open ? <X size={28} /> : <Menu size={28} />}
				</button>
			</nav>

			{open && (
				<div className="absolute top-full left-0 w-full md:hidden bg-[#F6F1EC] border-t border-[#E2D5C8] flex flex-col items-center px-6 py-6 space-y-4 shadow-lg">
					<Link className="font-title" onClick={() => setOpen(false)} href="/">
						Início
					</Link>
					<hr className="py-full px-6 border-[#A98063] " />
					<Link
						className="font-title"
						onClick={() => setOpen(false)}
						href="/about"
					>
						Sobre
					</Link>
					<hr className="py-full px-6 border-[#A98063] " />
					<Link
						className="font-title"
						onClick={() => setOpen(false)}
						href="/services"
					>
						Serviços
					</Link>
					<hr className="py-full px-6 border-[#A98063] " />
					{token ? (
						<div className="flex flex-col gap-2">
							<Link
								onClick={() => setOpen(false)}
								href="/dashboard"
								className="font-title text-center bg-[#A98063] p-5 text-white py-2 rounded-full "
							>
								Dashboard
							</Link>
							<button
								onClick={logout}
								className="cursor-pointer text-red-400 hover:bg-white/10 transition"
							>
								Sair
							</button>{" "}
						</div>
					) : (
						<Link
							onClick={() => setOpen(false)}
							href="/login"
							className="font-title text-center bg-[#A98063] p-5 text-white py-2 rounded-full "
						>
							Login
						</Link>
					)}
				</div>
			)}
		</header>
	);
}
