"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
function isPastDate(date: string, time: string) {
	const selected = new Date(`${date}T${time}`);
	const now = new Date();

	return selected < now;
}
export default function CreateAppointment() {
	const router = useRouter();

	const [petName, setPetName] = useState("");
	const [petSize, setPetSize] = useState("SMALL");
	const [serviceType, setServiceType] = useState("BATH");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const [showModal, setShowModal] = useState(false);
	const [price, setPrice] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handlePreview(e: React.FormEvent) {
		e.preventDefault();
		if (isPastDate(date, time)) {
			alert("Você não pode agendar um horário no passado.");
			return;
		}
		setLoading(true);

		try {
			const res = await fetch(
				"https://spa-dos-focinhos.onrender.com/appointments/preview",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						petSize,
						serviceType,
					}),
				},
			);

			if (!res.ok) throw new Error("Erro ao calcular preço");

			const data = await res.json();
			setPrice(data.price);
			setError(null);
			setShowModal(true);
		} catch {
			alert("Erro no preview do preço");
		} finally {
			setLoading(false);
		}
	}

	async function handleConfirm() {
		setLoading(true);
		setError(null);

		try {
			const res = await fetch(
				"https://spa-dos-focinhos.onrender.com/appointments",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						petName,
						petSize,
						serviceType,
						date,
						time,
					}),
				},
			);

			if (!res.ok) {
				const data = await res.json();

				const message = Array.isArray(data.message)
					? data.message[0]
					: data.message;

				setError(message || "Erro ao criar agendamento");
				return;
			}

			alert("Agendamento criado com sucesso!");
			setShowModal(false);
			router.replace("/appointments");
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="relative min-h-screen bg-[#F4ECE6] flex items-center justify-center px-4">
			<Image
				src="/fundodashboard.png"
				alt="cachorrinho relaxando"
				fill
				priority
				className="object-cover  z-0 pointer-events-none "
			/>
			<div className="relative z-10 -mt-30">
				<form
					onSubmit={handlePreview}
					className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-4"
				>
					<h2 className="text-2xl font-bold text-center text-[#4B3B2F]">
						Novo Agendamento
					</h2>

					<input
						className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A98063]"
						placeholder="Nome do pet"
						value={petName}
						onChange={(e) => setPetName(e.target.value)}
						required
					/>

					<select
						className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A98063]"
						value={petSize}
						onChange={(e) => setPetSize(e.target.value)}
					>
						<option value="SMALL">Pequeno</option>
						<option value="MEDIUM">Médio</option>
						<option value="LARGE">Grande</option>
					</select>

					<select
						className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A98063]"
						value={serviceType}
						onChange={(e) => setServiceType(e.target.value)}
					>
						<option value="BATH">Banho</option>
						<option value="GROOMING">Tosa</option>
						<option value="BATH_AND_GROOMING">Banho + Tosa</option>
					</select>

					<input
						type="date"
						className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A98063]"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
					/>

					<input
						type="time"
						className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A98063]"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						required
					/>

					<button
						disabled={loading}
						className="w-full cursor-pointer bg-[#A98063] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
					>
						{loading ? "Calculando..." : "Criar Agendamento"}
					</button>
				</form>
			</div>
			{showModal && (
				<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 ">
					<div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
						<h3 className="text-lg font-bold mb-3 cursor-pointer">
							Confirmar Agendamento
						</h3>

						<p className="mb-5">
							O valor do serviço será:
							<span className="font-bold text-[#A98063]"> R$ {price}</span>
						</p>
						{error && (
							<p className="text-red-600 text-sm text-center mb-4">{error}</p>
						)}

						<div className=" flex gap-3">
							<button
								onClick={() => {
									setShowModal(false);
									setError(null);
								}}
								className="w-full border rounded-xl py-2 cursor-pointer hover:bg-gray-100"
							>
								Cancelar
							</button>

							<button
								onClick={handleConfirm}
								disabled={loading || !!error}
								className="w-full bg-[#A98063] text-white cursor-pointer rounded-xl py-2 hover:opacity-90"
							>
								Confirmar
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
