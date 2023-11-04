import { enhance } from '$app/forms';
import { writable } from 'svelte/store';
import type { ZodObject, ZodRawShape, z } from 'zod';

export function createForm<T extends ZodRawShape, F>(z: ZodObject<T>, form: F) {
	const formStore = writable(form);

	const zodActionEnhance = (formElement: HTMLFormElement) => {
		enhance(formElement, () => {
			console.log('entered');
			return () => {
				console.log('recived');
			};
		});
	};

	return { zodActionEnhance };
}
