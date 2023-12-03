import type { Actions } from '@sveltejs/kit';
import { studentSchema } from '../simple-form/studentSchema.js';

function sleep(ms: number) {
	const DEF_DELAY = 1000;
	return new Promise((resolve) => setTimeout(resolve, ms || DEF_DELAY));
}

export const actions: Actions = {
	default: async ({ request }) => {
		// const { failure, data } = await backendValidate(studentSchema, request);
		// if (failure) return failure;

		console.log(await request.formData())


		// if (Math.random() > 0.5) {
		// 	return fail(400, { message: 'I failed' });
		// }
	}
};
