/**
 * TripAI API service — typed wrappers for all backend REST endpoints.
 */

import { apiFetch } from "./client";

export type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  preferences?: Record<string, unknown>;
};

export type AuthPayload = { token: string; user: User };

export const authApi = {
  register: (body: { name: string; email: string; password: string; phone: string }) =>
    apiFetch<AuthPayload>("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),

  login: (body: { email: string; password: string }) =>
    apiFetch<AuthPayload>("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),

  google: (credential: string) =>
    apiFetch<AuthPayload>("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    }),

  logout: () => apiFetch<null>("/api/auth/logout", { method: "POST" }),

  me: () => apiFetch<User>("/api/auth/me"),

  updateProfile: (body: Record<string, unknown>) =>
    apiFetch<User>("/api/auth/profile", { method: "PUT", body: JSON.stringify(body) }),
};

export const travelApi = {
  search: (body: Record<string, unknown>) =>
    apiFetch<{ results: TravelResult[]; recommended: TravelResult | null }>("/api/travel/search", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  book: (body: Record<string, unknown>) =>
    apiFetch<{ booking: Booking; confirmation: { success: boolean; message: string } }>("/api/travel/book", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  bookings: (page = 1) => apiFetch<{ bookings: Booking[]; pagination: { total: number } }>(`/api/travel/bookings?page=${page}`),

  localRides: (body: { from: string; to: string; preference?: string }) =>
    apiFetch<{ results: TravelResult[]; aiRecommended: TravelResult | null }>("/api/travel/local-rides/search", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

export const hotelApi = {
  search: (params: Record<string, string | number>) => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return apiFetch<Hotel[]>(`/api/hotels/search?${q}`);
  },

  get: (id: string) => apiFetch<Hotel>(`/api/hotels/${id}`),

  book: (body: Record<string, unknown>) =>
    apiFetch<{ booking: Booking }>("/api/hotels/book", { method: "POST", body: JSON.stringify(body) }),

  bookings: () => apiFetch<{ bookings: Booking[] }>("/api/hotels/bookings"),
};

export const tripApi = {
  plan: (body: Record<string, unknown>) =>
    apiFetch<Record<string, unknown>>("/api/trips/plan", { method: "POST", body: JSON.stringify(body) }),
};

export const entertainmentApi = {
  search: (city?: string, type?: string) => {
    const q = new URLSearchParams();
    if (city) q.set("city", city);
    if (type) q.set("type", type);
    return apiFetch<Entertainment[]>(`/api/entertainment/search?${q}`);
  },

  book: (body: Record<string, unknown>) =>
    apiFetch<{ booking: Booking }>("/api/entertainment/book", { method: "POST", body: JSON.stringify(body) }),
};

export const alertApi = {
  list: (city: string) => apiFetch<Alert[]>(`/api/alerts?city=${encodeURIComponent(city)}`),
  weather: (city: string) => apiFetch<Alert[]>(`/api/alerts/weather?city=${encodeURIComponent(city)}`),
  subscribe: (city: string) =>
    apiFetch<{ alertCities: string[] }>("/api/alerts/subscribe", {
      method: "POST",
      body: JSON.stringify({ city }),
    }),
};

export const feedbackApi = {
  submit: (body: Record<string, unknown>) =>
    apiFetch<unknown>("/api/feedback", { method: "POST", body: JSON.stringify(body) }),

  mine: () => apiFetch<Feedback[]>(`/api/feedback/my`),
};

export const paymentApi = {
  history: () => apiFetch<Payment[]>("/api/payments/history"),

  initiate: (body: Record<string, unknown>) =>
    apiFetch<{
      payment: Payment;
      order: { id: string; amount: number; currency: string };
      razorpayKeyId: string;
    }>("/api/payments/initiate", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  verify: (body: {
    paymentId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) =>
    apiFetch<Payment>("/api/payments/verify", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

export const itineraryApi = {
  list: () => apiFetch<Itinerary[]>("/api/itineraries"),

  create: (body: Record<string, unknown>) =>
    apiFetch<Itinerary>("/api/itineraries", { method: "POST", body: JSON.stringify(body) }),

  get: (id: string) => apiFetch<Itinerary>(`/api/itineraries/${id}`),
};

export type TravelResult = {
  id: string;
  provider: string;
  price: number;
  duration?: string;
  departureTime?: string;
  arrivalTime?: string;
  availability?: number;
  rating?: string | number;
  from?: string;
  to?: string;
  type?: string;
};

export type Booking = {
  _id: string;
  type: string;
  provider: string;
  status: string;
  totalAmount: number;
  from?: string;
  to?: string;
  createdAt: string;
  paymentStatus?: string;
};

export type Hotel = {
  _id: string;
  name: string;
  city: string;
  address: string;
  starRating: number;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  availability?: number;
  rooms: { type: string; price: number; availability: number }[];
};

export type Entertainment = {
  _id: string;
  name: string;
  city: string;
  type: string;
  entryFee: number;
  popularity: number;
  location: string;
  ticketTiers: { name: string; price: number; available: number }[];
};

export type Alert = {
  _id: string;
  city: string;
  type: string;
  severity: string;
  title: string;
  message: string;
  createdAt: string;
};

export type Feedback = {
  _id: string;
  provider: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Payment = {
  _id: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
};

export type Itinerary = {
  _id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: string;
  days: unknown[];
};
