import { writable } from 'svelte/store';

export function createFormStore<T>(form: T) {
	const { subscribe, update } = writable(form);
	return {
		subscribe,
		restartErrors: () => update(($formData) => ({ ...$formData, errors: {} })),
		setErrors: (x: any) => update(($formData) => ({ ...$formData, errors: x })),
		cleanError: (name: string) =>
			update(($formData: any) => {
				if (!$formData || !$formData.errors) {
					return $formData;
				}
				$formData.errors[name] = undefined;
				return $formData;
			})
	};
}
