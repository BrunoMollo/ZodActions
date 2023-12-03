import { writable } from 'svelte/store';

export function create_stateStore() {
	const { subscribe, update } = writable({ loading: false, done: false });
	return {
		subscribe,
		startloading: () => update((state) => ({ ...state, loading: true })),
		stoploading: () => update((state) => ({ ...state, loading: false })),
		markAsDone: (done: boolean) => update((state) => ({ ...state, done }))
	};
}

export type StateStore = ReturnType<typeof create_stateStore>
