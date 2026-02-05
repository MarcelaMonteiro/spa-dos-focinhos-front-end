"use client";
import { footer } from "framer-motion/client";
import { PawPrint, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="w-full h-auto overflow-hidden bg-[#a98063] flex flex-col items-center gap-7 justify-center ">
			<Link
				href="/"
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				<div className="mt-6">
					<Image
						src="/logoclaro.png"
						alt="Logo Spa dos focinhos"
						width={200}
						height={200}
						className="w-32 md:w-48 h-auto"
					/>
				</div>
			</Link>
			<div className="flex justify-center items-center md:gap-20 gap-6 md:gap-16">
				<div className="flex flex-col items-center gap-2 ">
					<MapPin className="text-[#EFE3D6]" />
					<p className="text-[#E7D6C6] font-body text-center whitespace-nowrap">
						Rua Cão feliz, 123
					</p>
				</div>
				<div className="flex flex-col items-center justify-center gap-2">
					<Phone className="text-[#EFE3D6]" />
					<p className="text-[#E7D6C6] text-center font-body whitespace-nowrap">
						21 99999-9999
					</p>
				</div>
				<div className="flex flex-col items-center gap-2 ">
					<Mail className="text-[#EFE3D6]" />
					<p className="text-[#E7D6C6] text-center font-body whitespace-nowrap">
						email@email.com
					</p>
				</div>
			</div>
			<p className="text-[#EFE3D6] text-center">
				© 2026 Spa dos Focinhos. Todos os direitos reservados.
			</p>
		</footer>
	);
}
