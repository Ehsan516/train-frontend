import type { Session, SetEntry } from "../types/training";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined;
const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? "false") === "true";

let mockSessions: Session[] = [];

export async function listSessions(): Promise<Session[]> {//listing sessions, if any
  if (USE_MOCKS) return mockSessions;
  if (!API_BASE) throw new Error("VITE_API_BASE_URL not configured");

  const res = await fetch(`${API_BASE}/sessions`);
  if (!res.ok) throw new Error(await res.text());
  const data: Array<{
    session: { id: string; startedAt: string; notes?: string | null };
    sets: Array<{
      id: string;
      exerciseId: string;
      reps?: number | null;
      weightKg?: number | null;
      rpe?: number | null;
      notes?: string | null;
    }>;
  }> = await res.json();

  const sessions: Session[] = data.map((row) => ({
    id: row.session.id,
    date: row.session.startedAt,//ISO string
    notes: row.session.notes ?? undefined,
    sets: row.sets.map((s) => ({
      id: s.id,
      exerciseId: s.exerciseId,
      reps: s.reps ?? undefined,
      weightKg: s.weightKg ?? undefined,
      rpe: s.rpe ?? undefined,
      notes: s.notes ?? undefined,
    })),
  }));

  return sessions;
}

export async function createSession(dateISO: string, notes?: string): Promise<Session> {//creatuing new session
  if (USE_MOCKS) {
    const s: Session = { id: crypto.randomUUID(), date: dateISO, notes, sets: [] }; //session ojbect
    mockSessions = [s, ...mockSessions];//latest session is on ther list
    return s;
  }
  if (!API_BASE) throw new Error("VITE_API_BASE_URL not configured");

  const res = await fetch(`${API_BASE}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ startedAt: dateISO, notes }),
  });
  if (!res.ok) throw new Error(await res.text());

  const dto: { id: string; startedAt: string; notes?: string | null } = await res.json();
  return { id: dto.id, date: dto.startedAt, notes: dto.notes ?? undefined, sets: [] };
}

export async function addSet(//adding set to session
  sessionId: string,
  payload: Omit<SetEntry, "id">//ID excluded as its generated
): Promise<SetEntry> {
  if (USE_MOCKS) {
    const set: SetEntry = { id: crypto.randomUUID(), ...payload }; //new set with unique id added
    mockSessions = mockSessions.map((s) =>
      s.id === sessionId ? { ...s, sets: [...s.sets, set] } : s //set is added to the correct session
    );
    return set; //new set returned
  }
  if (!API_BASE) throw new Error("VITE_API_BASE_URL not configured");

  const res = await fetch(`${API_BASE}/sessions/${sessionId}/sets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), //xerciseId, reps, weightKg, rpe, notes
  });
  if (!res.ok) throw new Error(await res.text());

  const dto: {
    id: string;
    exerciseId: string;
    reps?: number | null;
    weightKg?: number | null;
    rpe?: number | null;
    notes?: string | null;
  } = await res.json();

  return {
    id: dto.id,
    exerciseId: dto.exerciseId,
    reps: dto.reps ?? undefined,
    weightKg: dto.weightKg ?? undefined,
    rpe: dto.rpe ?? undefined,
    notes: dto.notes ?? undefined,
  };
}
