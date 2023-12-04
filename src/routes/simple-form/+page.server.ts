import type { Actions } from '@sveltejs/kit';
import { studentSchema } from './studentSchema.js';
import { backendValidate } from '$lib/index.js';
import { sleep } from '../utils-testing.js';


export const actions: Actions = {
	do_thing: async ({ request }) => {
		const { failure, data } = await backendValidate(studentSchema, request);
		if (failure) return failure;

		await sleep();

		console.log(data);

		// if (Math.random() > 0.5) {
		// 	return fail(400, { message: 'I failed' });
		// }
	}
};
