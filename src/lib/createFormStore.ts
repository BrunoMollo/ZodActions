import { writable } from 'svelte/store';

export function createFormStore<T>(form: T) {
	const { subscribe, set, update } = writable<Partial<T>>(form);
	return {
		subscribe,
		restartErrors: () => update(($formData) => ({ ...$formData, errors: {} })),
		setErrors: (x: any) => update(($formData) => ({ ...$formData, errors: x }))
	};
}
