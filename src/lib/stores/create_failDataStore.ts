import { writable } from "svelte/store";

export const create_failDataStore = () => writable<null | Record<string, unknown>>(null)

export type FailDataStore = ReturnType<typeof create_failDataStore>

