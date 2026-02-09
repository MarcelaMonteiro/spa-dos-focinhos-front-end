import React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="auth-container overflow-hidden">{children}</div>
		</>
	);
}
