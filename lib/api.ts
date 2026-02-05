export async function apiFetch(path: string, options: RequestInit = {}) {
	const token = localStorage.getItem("token");

	const res = await fetch(`https://spa-dos-focinhos.onrender.com${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` }),
			...options.headers,
		},
	});

	if (res.status === 401) {
		localStorage.removeItem("token");
		window.location.href = "/login";
		throw new Error("Unauthorized");
	}

	return res;
}
