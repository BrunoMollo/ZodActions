import type { Actions } from '@sveltejs/kit';
import { backendValidate } from '$lib/index.js';
import { sleep } from '../utils-testing.js';
import { todosSchema } from './todosSchema.js';


export const actions: Actions = {
	default: async ({ request }) => {
		const { failure, data } = await backendValidate(todosSchema, request);
		if (failure) return failure;

		await sleep();

		console.log(data);

	}
};
