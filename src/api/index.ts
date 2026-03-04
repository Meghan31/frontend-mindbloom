// src/api/index.ts

// API URL (use environment variable or fallback to deployed backend)
const API_URL = import.meta.env.VITE_API_URL;

// Retry a fetch call once on network errors (handles Vercel cold-start races
// where the first request arrives before the serverless function is warm and
// gets a 502 with no CORS headers, which the browser reports as a CORS block).
const fetchWithRetry = async (
	input: RequestInfo | URL,
	init?: RequestInit,
	retries = 1,
	delayMs = 1500,
): Promise<Response> => {
	try {
		return await fetch(input, init);
	} catch (err) {
		if (retries > 0) {
			await new Promise((resolve) => setTimeout(resolve, delayMs));
			return fetchWithRetry(input, init, retries - 1, delayMs);
		}
		throw err;
	}
};

// Helper function to get the auth token
const getAuthHeader = () => {
	const token = localStorage.getItem('token');
	return {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
	};
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
	if (!response.ok) {
		let errorMessage = `API Error: ${response.status} ${response.statusText}`;

		try {
			const errorData = await response.json();
			errorMessage = errorData.error || errorMessage;
		} catch {
			try {
				const errorText = await response.text();
				if (errorText) errorMessage = errorText;
			} catch {
				// use default error message
			}
		}

		throw new Error(errorMessage);
	}

	return response.json();
};

// Auth API endpoints
export const authAPI = {
	// Register a new user
	register: async (
		username: string,
		email: string,
		password: string,
	): Promise<{ message: string }> => {
		const response = await fetchWithRetry(`${API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, email, password }),
		});

		return handleResponse(response);
	},

	// Login an existing user
	login: async (
		email: string,
		password: string,
	): Promise<{ message: string; token: string; user: any }> => {
		const response = await fetchWithRetry(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await handleResponse(response);

		if (data.token) {
			localStorage.setItem('token', data.token);
		} else {
			throw new Error('Login response did not include a token');
		}

		return data;
	},

	// Logout the current user
	logout: () => {
		localStorage.removeItem('token');
	},
};

// Journal API endpoints
export const journalAPI = {
	// Create a new journal entry
	createEntry: async (content: string, mood: string): Promise<any> => {
		const response = await fetchWithRetry(`${API_URL}/journal`, {
			method: 'POST',
			headers: getAuthHeader(),
			body: JSON.stringify({ content, mood }),
		});

		return handleResponse(response);
	},

	// Get all journal entries
	getAllEntries: async (): Promise<any[]> => {
		try {
			const response = await fetchWithRetry(`${API_URL}/journal`, {
				method: 'GET',
				headers: getAuthHeader(),
			});

			return handleResponse(response);
		} catch {
			return [];
		}
	},

	// Get a specific journal entry
	getEntry: async (id: number): Promise<any> => {
		const response = await fetchWithRetry(`${API_URL}/journal/${id}`, {
			method: 'GET',
			headers: getAuthHeader(),
		});

		return handleResponse(response);
	},

	// Get entries by date
	getEntriesByDate: async (date: string): Promise<any[]> => {
		try {
			const response = await fetchWithRetry(`${API_URL}/journal/date/${date}`, {
				method: 'GET',
				headers: getAuthHeader(),
			});

			return handleResponse(response);
		} catch {
			return [];
		}
	},
};

// Affirmation API endpoints
export const affirmationAPI = {
	// Get today's affirmation based on mood
	getTodayAffirmation: async (mood: string): Promise<any> => {
		const response = await fetchWithRetry(
			`${API_URL}/affirmation/today?mood=${mood}`,
			{
				method: 'GET',
				headers: getAuthHeader(),
			},
		);

		return handleResponse(response);
	},

	// Get all affirmations for a specific mood
	getMoodAffirmations: async (mood: string): Promise<any[]> => {
		const response = await fetchWithRetry(`${API_URL}/affirmations/${mood}`, {
			method: 'GET',
			headers: getAuthHeader(),
		});

		return handleResponse(response);
	},
};

// Simple test endpoint to check if API is reachable
export const testAPI = async (): Promise<boolean> => {
	try {
		const response = await fetch(`${API_URL.replace(/\/api$/, '')}/health`);
		return response.ok;
	} catch {
		return false;
	}
};

// Warm up the backend on module import (reduces cold-start latency for first real request)
testAPI();
