import type { Exercise } from "../types/training";
const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? "false") === "true";

//basic catalogue for now

let mockExercises: Exercise[] = [
    {id: "xBench", name: "Bench press", tags: ["pecs", "triceps", "front-delts"], category: "strength", isCustom: false},
    {id: "xSquat", name: "Barbell Squat", tags: ["quadriceps", "glutes", "erectors"], category: "strength", isCustom: false},
    {id: "xDeadlift", name: "Deadlift", tags: ["hamstrings", "glutes", "erectors"], category: "strength", isCustom: false},
    {id: "xOhp", name: "Overhead Press", tags: ["delts", "triceps", "upper-back"], category: "strength", isCustom: false},
    {id: "xRow", name: "Barbell Rows", tags: ["lats", "upper-back", "biceps"], category: "strength", isCustom: false},
    {id: "xChin", name: "Chin-up", tags: ["lats", "biceps", "forearms"], category: "strength", isCustom: false},
];

export async function listExercises(): Promise<Exercise[]> {
    if (USE_MOCKS) return mockExercises;//returns exercises
    throw new Error("Wire backend later");
}

export async function createExercise(name: string, tags: string[], category = "strength" ): Promise<Exercise> {
    if (USE_MOCKS) {
        const ex: Exercise = { id: crypto.randomUUID(), name, tags, category, isCustom: true };//uuid for unique IDs for each exercise,session and set
        mockExercises = [ex, ...mockExercises];
        return ex;
  }
  throw new Error("Backend later");//will sort out Unique data once backend is live
}