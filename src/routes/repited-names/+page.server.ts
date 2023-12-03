import type { Actions } from '@sveltejs/kit';
import { backendValidate } from '$lib/index.js';
import { animalsSchema } from './animalsSchema.js';

function sleep(ms: number) {
	const DEF_DELAY = 1000;
	return new Promise((resolve) => setTimeout(resolve, ms || DEF_DELAY));
}

export const actions: Actions = {
	default: async ({ request }) => {

		console.log('dsadsada')
		const { failure, data } = await backendValidate(animalsSchema, request);
		if (failure) return failure;
		console.log(data)
		await sleep(10)

	}
};
