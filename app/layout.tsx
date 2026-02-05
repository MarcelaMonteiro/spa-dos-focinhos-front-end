import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/Footer";
import { AuthProvider } from "@/src/context/AuthContext";

export const metadata: Metadata = {
	title: "Spa dos Focinhos",
	description: "Site fictício de uma pet shop chamada Spa dos Focinhos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
