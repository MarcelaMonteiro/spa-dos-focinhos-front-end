"use client";
import Link from "next/link";
import { Appointment, getMyAppointments } from "@/lib/appointments";
import { AppointmentCard } from "@/components/AppointmentCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Appointments() {
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getMyAppointments()
			.then(setAppointments)
			.finally(() => setLoading(false));
	}, []);

	function handleDeleted(id: number) {
		setAppointments((prev) => prev.filter((a) => a.id !== id));
	}

	if (loading) {
		return <p className="text-center mt-10">Carregando...</p>;
	}

	if (appointments.length === 0) {
		return (
			<section className="relative flex flex-col items-center h-[100vh] bg-[#F4ECE6] overflow-hidden">
				<Image
					src="/fundodashboard.png"
					alt="cachorrinho relaxando"
					fill
					priority
					className="object-cover z-0 pointer-events-none "
				/>
				<div className="relative z-10 md:w-[500] w-[300] text-center bg-white/45  py-10 rounded-2xl flex flex-col justify-center mt-50  gap-5">
					<h2 className=" text-2xl text-[#8B7766]">
						Você ainda não tem agendamentos.
					</h2>
					<Link href="/appointments/create">
						<button className="w-50 relative z-10 h-11 bg-[#A98063] text-white rounded-2xl cursor-pointer">
							Deseja agendar?
						</button>
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="relative h-[100vh] mx-auto md:px-11  px-6 overflow-hidden bg-[#F4ECE6]">
			<Image
				src="/fundodashboard.png"
				alt="cachorrinho relaxando"
				fill
				priority
				className="object-cover z-0 blur-sm scale-110  pointer-events-none "
			/>{" "}
			<div className="absolute inset-0 bg-white/50 -z-10" />
			<div
				className="relative z-10 flex flex-col gap-4 mb-8 mt-20
                sm:flex-row sm:items-center sm:justify-between text-center"
			>
				<h1 className="font-bold text-3xl text-center ">Meus agendamentos:</h1>

				<Link href="/appointments/create" className="w-full sm:w-auto">
					<button
						className="w-auto sm:w-auto
                 px-5 py-3
                 bg-[#A98063] text-white
                 rounded-xl hover:opacity-90 cursor-pointer"
					>
						+ Novo agendamento
					</button>
				</Link>
			</div>
			<div className="space-y-6 relative z-10">
				{appointments.map((a) => (
					<AppointmentCard
						key={a.id}
						id={a.id}
						petName={a.petName}
						serviceType={a.serviceType}
						date={a.date}
						time={a.time}
						price={a.price}
						onDeleted={() => handleDeleted(a.id)}
					/>
				))}
			</div>
		</section>
	);
}
