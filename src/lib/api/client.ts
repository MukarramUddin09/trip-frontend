/**
 * HTTP client for TripAI REST API — attaches JWT and normalizes responses.
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  error: string | null;
};

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

/**
 * Returns stored JWT or null.
 * @returns {string | null}
 */
export function getToken(): string | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem("tripai-token");
}

/**
 * Persists JWT in localStorage.
 * @param {string | null} token - JWT or null to clear
 */
export function setToken(token: string | null) {
  if (typeof localStorage === "undefined") return;
  if (token) localStorage.setItem("tripai-token", token);
  else localStorage.removeItem("tripai-token");
}

/**
 * Performs an authenticated fetch against the TripAI API.
 * @param {string} path - API path (e.g. /api/hotels/search)
 * @param {RequestInit} [options] - Fetch options
 * @returns {Promise<T>} Parsed response data
 */
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  let json: ApiResponse<T>;
  try {
    json = await res.json();
  } catch {
    throw new ApiError("Invalid server response", res.status);
  }

  if (!res.ok || !json.success) {
    throw new ApiError(json.message || "Request failed", res.status, json.error);
  }

  return json.data;
}

export { API_BASE };
