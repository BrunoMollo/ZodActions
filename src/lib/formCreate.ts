import { enhance } from '$app/forms';
import { readonly, writable } from 'svelte/store';
import type { ZodObject, ZodRawShape } from 'zod';

function createStateStore() {
	const { subscribe, set, update } = writable({ loading: false });
	return {
		subscribe,
		startloading: () => update((state) => ({ ...state, loading: true })),
		stoploading: () => update((state) => ({ ...state, loading: false }))
	};
}

export function createForm<T extends ZodRawShape, F>(z: ZodObject<T>, form: F) {
	const formStore = writable(form);
	const state = createStateStore();

	const zodActionEnhance = (formElement: HTMLFormElement) => {
		enhance(formElement, () => {
			console.log('entered');
			state.startloading();
			return ({ update }) => {
				console.log('recived');
				state.stoploading();
				update();
			};
		});
	};

	return { zodActionEnhance, state: readonly(state) };
}
