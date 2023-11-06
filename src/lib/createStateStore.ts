import { writable } from 'svelte/store';

export function createStateStore() {
	const { subscribe, update } = writable({ loading: false });
	return {
		subscribe,
		startloading: () => update((state) => ({ ...state, loading: true })),
		stoploading: () => update((state) => ({ ...state, loading: false }))
	};
}
