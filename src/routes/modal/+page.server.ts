import { fail, type Actions } from '@sveltejs/kit';
import { fruitSchema } from './fruitSchema.js';
import type { PageServerLoad } from './$types.js';
import { backendValidate } from '$lib/index.js';
import { getFruits, sleep } from '../utils-testing.js';

const fruits = getFruits()
export const load: PageServerLoad = () => {
	return { fruits }
}


export const actions: Actions = {
	default: async ({ request }) => {
		const { failure, data } = await backendValidate(fruitSchema, request);
		if (failure) return failure;

		await sleep();

		console.log(data);

		if (fruits.map(x => x.name).includes(data.name)) {
			const msj = 'can not have two fruits with the same name'
			console.log(msj)
			return fail(409, { msj })
		}


		fruits.push(data)
	}
};
