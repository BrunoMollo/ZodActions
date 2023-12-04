import type { ErrorsStore } from "$lib/stores/create_errorsStore.js";
import type { StateStore } from "$lib/stores/create_stateStore.js";


export type SkipSend = {
	set: (value: boolean) => void,
	get: () => boolean
}

export function make_cleanErrorOnInput(errors: ErrorsStore, state: StateStore) {
	let skip_send_flag = false
	const skipSend = {
		set: (value: boolean) => skip_send_flag = value,
		get: () => skip_send_flag
	}
	return {
		skipSend,
		cleanErrorOnInput:
			(formElement: HTMLFormElement) => {

				const inputs = formElement.querySelectorAll('input');
				const btn = formElement.querySelector('button')

				const handleInput = () => {
					skipSend.set(true)
					btn?.click()
				}

				errors.subscribe((err: any) => {
					if (Object.keys(err).length > 0) {
						inputs.forEach(input => input.addEventListener('input', handleInput))
					}

				})

				state.subscribe(({ done }) => {
					if (done) {
						inputs.forEach((input) => input.removeEventListener('input', handleInput));
					}
				})

				return {
					destroy: () => {
						inputs.forEach((input) => input.removeEventListener('input', handleInput));
					}
				};
			}
	}

}


