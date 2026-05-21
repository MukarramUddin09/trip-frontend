/**
 * WebSocket hook — subscribes to live availability updates from TripAI backend.
 */

import * as React from "react";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:5000/ws";

export type AvailabilityUpdate = {
  type: "availability_update";
  provider: string;
  route?: string;
  hotelId?: string;
  seatsLeft?: number;
  roomsLeft?: number;
  timestamp: string;
};

/**
 * Connects to TripAI WebSocket and streams availability updates.
 * @param {string} city - City to subscribe to
 * @param {string[]} [categories] - Categories (hotel, flight, train)
 * @returns {AvailabilityUpdate | null} Latest update
 */
export function useAvailabilityWs(city: string, categories: string[] = ["hotel", "flight"]) {
  const [latest, setLatest] = React.useState<AvailabilityUpdate | null>(null);
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    if (!city) return;
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ type: "subscribe", city, categories }));
    };

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === "availability_update") setLatest(data);
      } catch {
        /* ignore */
      }
    };

    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);

    return () => ws.close();
  }, [city, categories.join(",")]);

  return { latest, connected };
}
