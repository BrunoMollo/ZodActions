import type { Actions } from '@sveltejs/kit';
import { backendValidate } from '$lib/index.js';
import { sleep } from '../utils-testing.js';
import { petSchema } from './petSchema.js';


export const actions: Actions = {
	add_cat: async ({ request }) => {
		const { failure, data } = await backendValidate(petSchema, request);
		if (failure) return failure;

		await sleep();

		console.log('Cat: ', data);
	},


	add_dog: async ({ request }) => {
		const { failure, data } = await backendValidate(petSchema, request);
		if (failure) return failure;

		await sleep();

		console.log('Dog: ', data);

	}
};
