import type { Actions } from '@sveltejs/kit';
import { backendValidate } from '$lib/index.js';
import { animalsSchema } from './animalsSchema.js';
import { sleep } from '../sleep.js';


export const actions: Actions = {
	default: async ({ request }) => {

		const { failure, data } = await backendValidate(animalsSchema, request);
		if (failure) return failure;

		console.log(data)

		await sleep()

	}
};
