import type { Exercise } from "../types/training";
const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? "false") === "true";

//basic catalogue for now

let mockExercises: Exercise[] = [
    {id: "xBench", name: "Bench press", tags: ["pecs", "triceps", "front-delts"], category: "strength"},
    {id: "xSquat", name: "Barbell Squat", tags: ["quadriceps", "glutes", "erectors"], category: "strength"},
    {id: "xDeadlift", name: "Deadlift", tags: ["hamstrings", "glutes", "erectors"], category: "strength"},
    {id: "xOhp", name: "Overhead Press", tags: ["delts", "triceps", "upper-back"], category: "strength"},
    {id: "xRow", name: "Barbell Rows", tags: ["lats", "upper-back", "biceps"], category: "strength"},
    {id: "xChin", name: "Chin-up", tags: ["lats", "glutes", "forearms"], category: "strength"},
];

export async function listExercises(): Promise<Exercise[]> {
    if (USE_MOCKS) return mockExercises;
    throw new Error("Wire backend later");
}

