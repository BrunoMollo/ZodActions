import type { Actions } from '@sveltejs/kit';
import { studentSchema } from './studentSchema.js';
import { backendValidate } from '$lib/backendValidate.js';

function sleep(ms: number) {
	const DEF_DELAY = 1000;
	return new Promise((resolve) => setTimeout(resolve, ms || DEF_DELAY));
}

export const actions: Actions = {
	do_thing: async ({ request }) => {
		const { failure, data } = await backendValidate(studentSchema, request);
		if (failure) return failure;

		await sleep(1000);

		console.log(data);

		// if (Math.random() > 0.5) {
		// 	return fail(400, { message: 'I failed' });
		// }
	}
};
