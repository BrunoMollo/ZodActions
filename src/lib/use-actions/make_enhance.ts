
import { enhance } from '$app/forms';
import type { FailDataStore } from '$lib/stores/create_failDataStore.js';
import type { FormStore } from '$lib/stores/create_formStore.js';
import type { StateStore } from '$lib/stores/create_stateStore.js';
import { formatErrors } from '$lib/utils/formatErrors.js';
import { processFormData } from '$lib/utils/processFormData.js';
import type { Action } from 'svelte/action';
import type { ZodObject, ZodRawShape } from 'zod';

type Attibutes = {
	'on:submitDone'?: (event: CustomEvent) => any
}
export function make_enhance<T extends ZodRawShape>(
	zodSchema: ZodObject<T>,
	formStore: FormStore,
	state: StateStore,
	failData: FailDataStore
) {

	const func: Action<HTMLFormElement, any, Attibutes> = (formElement: HTMLFormElement) => {
		const { destroy } = enhance(formElement, ({ formData, cancel }) => {
			formStore.restartErrors();
			state.markAsDone(false);


			const zodRes = zodSchema.safeParse(processFormData(formData));
			if (!zodRes.success) {
				formStore.setErrors(formatErrors(zodRes));
				console.error(formatErrors(zodRes));
				return cancel();
			}
			state.startloading();

			return ({ update, result }) => {
				formStore.restartErrors();
				state.stoploading();
				if (result.type == 'success') {
					state.markAsDone(true);
					formElement.dispatchEvent(new CustomEvent('submitDone'))
					failData.set(null)
				}
				if (result.type == 'failure') {
					failData.set(result.data ?? null)
				}
				update();
			};
		});
		return {
			destroy: () => destroy()
		};
	}
	return func

}


