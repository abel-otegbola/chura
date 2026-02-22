import type { ProduceItem } from "../appwrite/produceService";

const KEY = "chura_produces_offline";

export function getOfflineProduces(): ProduceItem[] {
  try {
    const data = localStorage.getItem(KEY);
    if (!data) return [];
    return JSON.parse(data) as ProduceItem[];
  } catch (err) {
    console.warn("Failed to load offline produces", err);
    return [];
  }
}

export function saveOfflineProduces(items: ProduceItem[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("Failed to save offline produces", err);
  }
}

export function addOfflineProduce(item: ProduceItem): void {
  const all = getOfflineProduces();
  // assign a tmp ID if none provided
  if (!item._tmpId && !item.$id) {
    item._tmpId = `tmp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
  all.push(item);
  saveOfflineProduces(all);
}

export function updateOfflineProduce(id: string, patch: Partial<ProduceItem>): void {
  const all = getOfflineProduces();
  const idx = all.findIndex((p) => p.$id === id || p._tmpId === id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...patch };
    saveOfflineProduces(all);
  }
}

export function deleteOfflineProduce(id: string): void {
  const all = getOfflineProduces();
  const filtered = all.filter((p) => p.$id !== id && p._tmpId !== id);
  saveOfflineProduces(filtered);
}

export function clearOfflineProduces(): void {
  localStorage.removeItem(KEY);
}
