import type { Actions } from '@sveltejs/kit';
import { fruitSchema } from './fruitSchema.js';
import { backendValidate } from '$lib/backendValidate.js';
import type { PageServerLoad } from './$types.js';

const fruits = [{ name: 'Banana' }, { name: 'Apple' }]
export const load: PageServerLoad = () => {
	return { fruits }
}


function sleep(ms: number) {
	const DEF_DELAY = 1000;
	return new Promise((resolve) => setTimeout(resolve, ms || DEF_DELAY));
}

export const actions: Actions = {
	default: async ({ request }) => {
		const { failure, data } = await backendValidate(fruitSchema, request);
		if (failure) return failure;

		await sleep(1000);

		console.log(data);

		fruits.push(data)
	}
};
