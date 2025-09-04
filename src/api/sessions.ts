
import type { Session, SetEntry } from "../types/training"; //importing type definitions from before 
const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? "false") === "true"; //if syatement until backend is live, fake memory is used

let mockSessions: Session[] = []; //mock sessions (resets on reload)

export async function listSessions(): Promise<Session[]> {//listing sessions, if any
  if (USE_MOCKS){
    return mockSessions;
  }
  throw new Error("Backend not live");
}

export async function createSession(dateISO: string, notes?: string): Promise<Session> {//creatuing new session
  if (USE_MOCKS) {
    const s: Session = { id: crypto.randomUUID(), date: dateISO, notes, sets: [] }; //session ojbect
    mockSessions = [s, ...mockSessions];//latest session is on ther list
    return s;
  }
  throw new Error("Backend not live yet");
}

export async function addSet(//adding set to session
  sessionId: string,
  payload: Omit<SetEntry, "id">//ID excluded as its generated
):Promise<SetEntry>{
  if (USE_MOCKS) {
    const set: SetEntry = { id: crypto.randomUUID(), ...payload }; //new set with unique id added
    
    mockSessions = mockSessions.map(s =>
      s.id === sessionId ? { ...s, sets: [...s.sets, set] } : s //set is added to the correct session
    );
    return set; //new set returned
  }
  throw new Error("Backend not live yet");
}
