import type { FormStore } from "$lib/stores/create_formStore.js";

export const make_cleanErrorOnInput = (formStore: FormStore) => (formElement: HTMLFormElement) => {
	const handleInput = (e: any) => formStore.cleanError(e.target?.name);
	const inputs = formElement.querySelectorAll('input');

	inputs.forEach((input) => input.addEventListener('input', handleInput));

	return {
		destroy: () => {
			inputs.forEach((input) => input.removeEventListener('input', handleInput));
		}
	};
};
