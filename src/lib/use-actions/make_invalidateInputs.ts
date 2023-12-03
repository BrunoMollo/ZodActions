import type { ErrorsStore } from "$lib/stores/create_errorsStore.js";
import type { StateStore } from "$lib/stores/create_stateStore.js";

export const make_invalidateInputs = (errors: ErrorsStore, state: StateStore) => (formElement: HTMLFormElement) => {
	const inputs = formElement.querySelectorAll('input');
	errors.subscribe((errors) =>
		inputs.forEach((input) => {
			if (Object.keys(errors).includes(input.name)) {
				if (errors[input.name]) {
					input.setAttribute('aria-invalid', 'true');
				} else {
					input.removeAttribute('aria-invalid');
				}
			}
		})
	);
	state.subscribe(({ loading }) => {
		if (loading) {
			inputs.forEach((input) => input.removeAttribute('aria-invalid'))
		}
	})
};

