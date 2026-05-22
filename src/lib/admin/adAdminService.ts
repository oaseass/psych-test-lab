import type { AdSlot } from "./types";
import { getMockAdSlots } from "./mockAdminData";

let _slots: AdSlot[] | null = null;

function getSlots(): AdSlot[] {
  if (!_slots) _slots = getMockAdSlots();
  return _slots;
}

export function getAdSlots(): AdSlot[] {
  return getSlots();
}

export function updateAdSlotStatus(slotId: string, enabled: boolean): void {
  if (typeof window === "undefined") return;
  const key = `admin_adslot_${slotId}`;
  localStorage.setItem(key, JSON.stringify({ enabled }));
  const slots = getSlots();
  const slot = slots.find(s => s.id === slotId);
  if (slot) slot.enabled = enabled;
}

export function getAdEstimate(rpm: number): { totalImpressions: number; totalRevenue: number; bySlot: { id: string; name: string; revenue: number }[] } {
  const slots = getSlots().filter(s => s.enabled);
  const bySlot = slots.map(s => ({
    id: s.id,
    name: s.name,
    revenue: Math.round((s.estimatedImpressions / 1000) * rpm),
  }));
  return {
    totalImpressions: slots.reduce((s, slot) => s + slot.estimatedImpressions, 0),
    totalRevenue: bySlot.reduce((s, b) => s + b.revenue, 0),
    bySlot,
  };
}
