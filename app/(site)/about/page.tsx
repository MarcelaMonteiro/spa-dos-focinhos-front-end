import Image from "next/image";

export default function About() {
	return (
		<section className="relative h-[100vh] md:flex md:justify-start md:items-start flex md:mt-0 items-center justify-center overflow-hidden bg-[#FDF8F7]">
			<Image
				src="/fotosobre.png"
				alt="Pet relaxando no spa"
				fill
				priority
				className="
    hidden md:block
    object-cover
    z-0
    scale-110
    translate-x-[15%] mask-[linear-gradient(to_bottom,transparent,black_100px)]
  "
			/>

			<div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
				<div
					className="
            absolute inset-y-0 left-0 w-[65%]
            bg-gradient-to-r
            from-white/95
            via-white/85
            via-white/65
            to-transparent
          "
				/>

				<div
					className="
            absolute inset-x-0 top-0 h-32
            bg-linear-to-b
            from-white/70
            to-transparent
          "
				/>

				<div
					className="
            absolute inset-x-0 bottom-0 h-32
            bg-gradient-to-t
            from-white/70
            to-transparent
          "
				/>
			</div>

			<div
				className="
          relative z-20
          h-full
          md:flex md:items-center
          px-10 md:px-32
          animate-fadeIn
        "
			>
				<div className="max-w-xl mt-9 md:-mt-2 ">
					<h2 className="font-title text-[#6A5A4E] font-bold text-[1.7rem] md:text-5xl whitespace-nowrap">
						Sobre o Spa dos Focinhos
					</h2>

					<h3 className="font-body text-[#BE9B7D] md:text-3xl text-2xl font-bold mt-2">
						Quem somos?
					</h3>

					<p className="mt-5 text-[#6A5A4E] font-body text-[1.1rem] leading-relaxed font-bold">
						Somos mais que um Spa para pets, somos um refúgio de bem-estar e
						carinho.
						<br />
						Nossa missão é proporcionar momentos de relaxamento e cuidado para o
						seu pet, garantindo que a visita seja uma experiência tranquila e
						agradável.
					</p>

					<div className="flex flex-col py-6 gap-2 text-[1.1rem] ">
						<span className="text-[#6A5A4E] font-body font-bold flex gap-2 items-center whitespace-nowrap">
							<Image
								src="/iconvela-removebg-preview.png"
								alt="Ícone de ambiente calmo e acolhedor"
								width={40}
								height={40}
								className=" "
							/>
							Ambiente calmo e acolhedor
						</span>
						<span className="text-[#6A5A4E] font-body font-bold flex gap-2 items-center whitespace-nowrap">
							<Image
								src="/iconprodutos-removebg-preview.png"
								alt="Ícone de Produtos naturais e seguros"
								width={40}
								height={40}
								className=" "
							/>
							Produtos naturais e seguros
						</span>
						<span className="text-[#6A5A4E] font-body font-bold flex gap-2 items-center whitespace-nowrap">
							<Image
								src="/iconcuidadopersonalizado-removebg-preview.png"
								alt="Ícone de cuidado personalizado"
								width={40}
								height={40}
								className=" "
							/>
							Atendimento personalizado
						</span>

						<Image
							src="/fotosobre.png"
							alt="Pet relaxando no spa"
							width={2000}
							height={2000}
							className=" md:hidden  mask-[radial-gradient(circle,white_0%,transparent_100%)]
    						[-webkit-mask-image:radial-gradient(circle,white_0%,transparent_100%)]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
