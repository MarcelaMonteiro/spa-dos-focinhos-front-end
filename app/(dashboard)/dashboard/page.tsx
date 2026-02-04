"use client";

import { useEffect, useState } from "react";
import { Appointment, getMyAppointments } from "@/lib/appointments";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
import { AppointmentCard } from "@/components/AppointmentCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Dashboard() {
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	return (
		<section className="relative overflow-hidden flex flex-col items-center text-center h-[100vh] bg-[#F4ECE6] ">
			<Image
				src="/fundodashboard.png"
				alt="cachorrinho relaxando"
				fill
				priority
				className="object-cover  z-0 pointer-events-none "
			/>
			<div className="relative z-0   flex flex-col items-center justify-center text-center px-6 gap-6 "></div>
			<div className="absolute bg-white/55 mt-40 md:w-[500] p-10 rounded-2xl">
				<div className=" flex flex-col justify-center  items-center ">
					<h1 className="text-tittle text-3xl">Olá, {user?.name}</h1>
					<h2 className="text-body text-2xl whitespace-nowrap text-center mt-4 ">
						Deseja agendar <br className="md:hidden"></br> um horário conosco?
					</h2>
				</div>
				<div className="md:flex flex flex-col items-center justify-center gap-5 mt-6">
					<Link href="/appointments/create">
						<button className="w-50 h-11 bg-[#A98063] text-white rounded-2xl cursor-pointer">
							Agendar horário
						</button>
					</Link>
					<Link href="/appointments">
						<button className="w-50 h-11 bg-[#A98063] text-white rounded-2xl cursor-pointer">
							Ver agendamentos
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
