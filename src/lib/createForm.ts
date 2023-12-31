import { readonly } from 'svelte/store';
import type { ZodObject, ZodRawShape } from 'zod';
import { create_formStore } from './stores/create_formStore.js';
import { create_stateStore } from './stores/create_stateStore.js';
import { make_revalidateInput } from './use-actions/make_revalidateInput.js';
import { create_errorsStore } from './stores/create_errorsStore.js';
import { create_failDataStore } from './stores/create_failDataStore.js';
import { make_enhance } from './use-actions/make_enhance.js';
import type { StringifyFields } from './utils/formatErrors.js';


export function createForm<T extends ZodRawShape, F>(zodSchema: ZodObject<T>, form: F) {
	const formStore = create_formStore(form);
	const state = create_stateStore();

	type Prettify<T> = { [K in keyof T]: T[K]; } & {};

	type Err = Prettify<Partial<StringifyFields<typeof zodSchema._type>>>
	const errors = create_errorsStore<Err>(formStore)

	const failData = create_failDataStore()

	const { revalidateInput, skipSend } = make_revalidateInput(errors, state)
	return {
		zodActionEnhance: make_enhance(zodSchema, formStore, state, failData, skipSend),
		revalidateInput,
		errors, state: readonly(state), failData: readonly(failData)
	};
}

export type ZodAction<T extends ZodRawShape> = ReturnType<typeof createForm<T, any>>


