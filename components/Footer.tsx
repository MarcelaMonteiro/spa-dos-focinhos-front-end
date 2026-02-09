"use client";
import { footer } from "framer-motion/client";
import { PawPrint, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="w-full h-auto overflow-hidden bg-[#a98063] flex flex-col md:p-2 p-6   md:items-center gap-7 md:justify-center ">
			<div className=" flex items-center justify-center">
				<Link
					href="/"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				>
					<div className="md:mt-3">
						<Image
							src="/logoclaro.png"
							alt="Logo Spa dos focinhos"
							width={200}
							height={200}
							className="w-32 md:w-45 h-20 md:h-25"
						/>
					</div>
				</Link>
			</div>
			<div className="flex md:justify-center md:flex-row flex-col items-start justify-items-start md:items-center md:gap-20 gap-6 ">
				<div className="flex md:flex-col items-center gap-2 ">
					<MapPin className="text-[#EFE3D6]" />
					<p className="text-[#E7D6C6] font-body text-center whitespace-nowrap">
						Rua Cão feliz, 123
					</p>
				</div>
				<div className="flex md:flex-col items-center gap-2 ">
					<Phone className="text-[#EFE3D6]" />
					<p className="text-[#E7D6C6] font-body text-center whitespace-nowrap">
						(21) 99999-9999
					</p>
				</div>
				<div className="flex md:flex-col items-center gap-2 ">
					<Mail className="text-[#EFE3D6]" />
					<p className="text-[#E7D6C6] text-center font-body whitespace-nowrap">
						email@email.com
					</p>
				</div>
			</div>
			<p className="text-[#EFE3D6] text-center text-[12px]">
				© 2026 Spa dos Focinhos. Todos os direitos reservados.
			</p>
		</footer>
	);
}
