import { enhance } from '$app/forms';
import { derived, readonly, type Stores } from 'svelte/store';
import type { ZodObject, ZodRawShape } from 'zod';
import { createStateStore } from './createStateStore.js';
import { createFormStore } from './createFormStore.js';

export function createForm<T extends ZodRawShape, F>(zodSchema: ZodObject<T>, form: F) {
	const formStore = createFormStore(form);
	const state = createStateStore();
	const errors = derived<Stores, Partial<T>>(
		formStore,
		($formStore: any) => ($formStore && $formStore.errors) ?? {}
	);

	const cleanErrorOnInput = (formElement: HTMLFormElement) => {
		const handleInput = (e: any) => formStore.cleanError(e.target?.name);
		const inputs = formElement.querySelectorAll('input');

		inputs.forEach((input) => input.addEventListener('input', handleInput));

		return {
			destroy: () => {
				inputs.forEach((input) => input.removeEventListener('input', handleInput));
			}
		};
	};

	const zodActionEnhance = (formElement: HTMLFormElement) => {
		const { destroy } = enhance(formElement, ({ formData, cancel }) => {
			formStore.restartErrors();

			const zodRes = zodSchema.safeParse(Object.fromEntries(formData));
			if (!zodRes.success) {
				formStore.setErrors(zodRes.error.flatten().fieldErrors);
				console.error(zodRes.error.flatten().fieldErrors);
				return cancel();
			}
			state.startloading();

			return ({ update }) => {
				state.stoploading();
				update();
			};
		});
		return {
			destroy: () => destroy()
		};
	};

	return { zodActionEnhance, cleanErrorOnInput, state: readonly(state), errors };
}
