import type { Exercise } from "../types/training";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined;
const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? "false") === "true";

//now fallback list just in case lol
let mockExercises: Exercise[] = [
    {id: "xBench", name: "Bench press", tags: ["pecs", "triceps", "front-delts"], category: "strength", isCustom: false},
    {id: "xSquat", name: "Barbell Squat", tags: ["quadriceps", "glutes", "erectors"], category: "strength", isCustom: false},
    {id: "xDeadlift", name: "Deadlift", tags: ["hamstrings", "glutes", "erectors"], category: "strength", isCustom: false},
    {id: "xOhp", name: "Overhead Press", tags: ["delts", "triceps", "upper-back"], category: "strength", isCustom: false},
    {id: "xRow", name: "Barbell Rows", tags: ["lats", "upper-back", "biceps"], category: "strength", isCustom: false},
    {id: "xChin", name: "Chin-up", tags: ["lats", "biceps", "forearms"], category: "strength", isCustom: false},
];

export async function listExercises(): Promise<Exercise[]> {
  if (USE_MOCKS) return mockExercises;
  if (!API_BASE) throw new Error("VITE_API_BASE_URL not configured");

  const res = await fetch(`${API_BASE}/exercises`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

//no POST/exercises on the backend yet,so mock
export async function createExercise(
  name: string,
  tags: string[],
  category = "strength"
): Promise<Exercise> {
  if (USE_MOCKS) {
    const ex: Exercise = { id: crypto.randomUUID(), name, tags, category, isCustom: true };//uuid for unique IDs for each exercise,session and set
    mockExercises = [ex, ...mockExercises];
    return ex;
  }
  throw new Error("exercise creation not added yet on back-end");
}