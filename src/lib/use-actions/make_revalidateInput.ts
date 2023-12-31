import type { ErrorsStore } from "$lib/stores/create_errorsStore.js";
import type { StateStore } from "$lib/stores/create_stateStore.js";


export type SkipSend = {
	set: (value: boolean) => void,
	get: () => boolean
}

export function make_revalidateInput(errors: ErrorsStore, state: StateStore) {
	let skip_send_flag = false
	const skipSend = {
		set: (value: boolean) => skip_send_flag = value,
		get: () => skip_send_flag
	}
	return {
		skipSend,
		revalidateInput:
			(formElement: HTMLFormElement) => {

				const btn = formElement.querySelector('[type="submit"]') as HTMLButtonElement

				const handleInput = () => {
					skipSend.set(true)
					btn?.click()
				}

				errors.subscribe((err: any) => {
					if (Object.keys(err).length > 0) {
						formElement.addEventListener('input', handleInput)
					}

				})

				state.subscribe(({ done }) => {
					if (done) {
						formElement.removeEventListener('input', handleInput)
					}
				})

				return {
					destroy: () => {
						formElement.removeEventListener('input', handleInput)
					}
				};
			}
	}

}


