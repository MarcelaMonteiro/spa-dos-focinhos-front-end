type Props = {
	id: number;
	petName: string;
	serviceType: string;
	date: string;
	time: string;
	price: number;
	onDeleted: () => void;
};
const SERVICE_LABEL: Record<string, string> = {
	BATH: "BANHO",
	GROOMING: "TOSA",
	BATH_AND_GROOMING: "BANHO + TOSA",
};
export function AppointmentCard({
	id,
	petName,
	serviceType,
	date,
	time,
	price,
	onDeleted,
}: Props) {
	async function handleDelete() {
		const confirm = window.confirm("Deseja cancelar o agendamento?");

		if (!confirm) return;

		const res = await fetch(`http://localhost:3001/appointments/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (!res.ok) {
			alert("Erro ao cancelar agendamento");
			return;
		}

		alert("Agendamento cancelado!");
		onDeleted();
	}
	return (
		<div className="bg-[#FBF7F4] rounded-2xl p-5 shadow-sm border border-[#E1D2C6]">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold text-[#6A5A4E]">{petName}</h3>
				<span className="text-[#B99577] font-bold">R$ {price}</span>
			</div>

			<p className="text-sm text-[#8B7766] mt-1">
				{SERVICE_LABEL[serviceType] ?? serviceType}
			</p>

			<div className="mt-3 text-sm text-[#6A5A4E]">
				{date} às {time}
			</div>
			<button
				onClick={handleDelete}
				className="text-red-600 hover:text-red-700 cursor-pointer"
			>
				Cancelar agendamento
			</button>
		</div>
	);
}
