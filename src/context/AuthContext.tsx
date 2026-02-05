"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

/* ================================
   Types
================================ */

type User = {
	id: number;
	name: string;
	email: string;
};

type AuthContextType = {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
	loading: boolean;
	login: (token: string) => Promise<void>;
	logout: () => void;
};

/* ================================
   Context
================================ */

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "token";

/* ================================
   Helpers
================================ */

function setTokenCookie(token: string | null) {
	if (typeof document === "undefined") return;

	if (!token) {
		document.cookie = `token=; Path=/; Max-Age=0; SameSite=Lax`;
		return;
	}

	document.cookie = `token=${encodeURIComponent(token)}; Path=/; SameSite=Lax`;
}

function readLocalToken(): string | null {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(TOKEN_KEY);
}

function isJwtExpired(token: string): boolean {
	try {
		const payloadPart = token.split(".")[1];
		if (!payloadPart) return true;

		const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");

		const json = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
				.join(""),
		);

		const payload = JSON.parse(json);

		const exp = payload?.exp;
		if (!exp) return false;

		const now = Math.floor(Date.now() / 1000);
		return now >= exp;
	} catch {
		return true;
	}
}

/* ================================
   Provider
================================ */

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	/* ================================
	   Load user from backend
	================================ */

	async function loadUser(jwt: string) {
		try {
			const res = await fetch("https://spa-dos-focinhos.onrender.com/auth/me", {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			if (!res.ok) {
				setUser(null);
				return;
			}

			const data: User = await res.json();
			setUser(data);
		} catch {
			setUser(null);
		}
	}

	/* ================================
	   Bootstrap on page refresh
	================================ */

	useEffect(() => {
		const saved = readLocalToken();

		// sem token → termina loading
		if (!saved) {
			setLoading(false);
			return;
		}

		// token expirado → limpa tudo
		if (isJwtExpired(saved)) {
			localStorage.removeItem(TOKEN_KEY);
			setToken(null);
			setUser(null);
			setLoading(false);
			return;
		}

		// token válido → carrega user
		setToken(saved);

		loadUser(saved).finally(() => {
			setLoading(false);
		});
	}, []);

	/* ================================
	   Sync token to storage + cookie
	================================ */

	useEffect(() => {
		if (!token) {
			localStorage.removeItem(TOKEN_KEY);
			setTokenCookie(null);
			return;
		}

		localStorage.setItem(TOKEN_KEY, token);
		setTokenCookie(token);
	}, [token]);

	/* ================================
	   Actions
	================================ */

	async function login(newToken: string) {
		if (isJwtExpired(newToken)) {
			setToken(null);
			setUser(null);
			return;
		}

		setToken(newToken);
		await loadUser(newToken);
	}

	function logout() {
		setToken(null);
		setUser(null);
	}

	/* ================================
	   Context Value
	================================ */

	const value = useMemo<AuthContextType>(
		() => ({
			token,
			user,
			isAuthenticated: !!token,
			loading,
			login,
			logout,
		}),
		[token, user, loading],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ================================
   Hook
================================ */

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
