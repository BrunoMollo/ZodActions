import { derived, type Stores } from "svelte/store";
import type { ZodRawShape } from "zod";
import type { FormStore } from "./create_formStore.js";

export const create_errorsStore = <T extends ZodRawShape>(formStore: FormStore) => {
	return derived<Stores, Partial<T>>(
		formStore,
		($formStore: any) => ($formStore && $formStore.errors) ?? {}
	);
}

export type ErrorsStore = ReturnType<typeof create_errorsStore>
