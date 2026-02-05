import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { Button } from "./ui/button";

export default function Hero() {
	return (
		<section className="relative  h-[100vh] overflow-hidden flex items-center justify-center md:flex md:items-start md:justify-start ">
			<Image
				src="/mobilebanner.png"
				alt="Pet relaxando no spa"
				fill
				priority
				className="object-cover h-[100vh] md:hidden"
			/>

			<Image
				src="/spadosfocinhosdesktop.png"
				alt="Pet relaxando no spa"
				fill
				priority
				className="h-full w-full object-cover hidden md:block absolute bottom-0 left-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
			/>

			<div className="absolute inset-0 bg-white/30 md:bg-white/20" />

			<div
				className="relative z-10 mx-10 md:mx-20 md:mx-25  
                      flex flex-col "
			>
				<div className="max-w-xl  md:space-y-6 space-y-2 md:mt-50  mt-30">
					<h1 className="font-title text-4xl md:text-5xl font-bold leading-tight text-[#6A5A4E]">
						Cuidado, carinho e <br className="hidden" />
						bem-estar para o seu pet
					</h1>

					<p className="font-body text-[#5C5147] max-w-md">
						Venha conhecer o Spa dos Focinhos, um ambiente acolhedor, pensado
						para o bem-estar e cuidado do seu melhor amigo.
					</p>
				</div>
				<div className="flex gap-3 md:py-7  py-4 whitespace-nowrap">
					<Button asChild variant="default">
						<Link href="./about">Saiba mais</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="../login">Agendar horário</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
