import { fail, type Actions } from '@sveltejs/kit';
import { fruitSchema } from './fruitSchema.js';
import type { PageServerLoad } from './$types.js';
import { backendValidate } from '$lib/index.js';

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

		if (fruits.map(x => x.name).includes(data.name)) {
			const msj = 'can not have two fruits with the same name'
			console.log(msj)
			return fail(409, { msj })
		}


		fruits.push(data)
	}
};
