type Props = {
	price: number;
};

export default function AppointmentPreview({ price }: Props) {
	return (
		<div className=" fixed inset-0 rounded-lg bg-white p-6">
			<h2 className="font-tittle">Preço do serviço:</h2>
			<h3>{price}</h3>
		</div>
	);
}
