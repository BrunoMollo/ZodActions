import { fail } from '@sveltejs/kit';
import type { ZodObject, ZodRawShape } from 'zod';
import { formatErrors } from './utils/formatErrors.js';
import { processFormData } from './utils/processFormData.js';

export async function backendValidate<T extends ZodRawShape>(
	zodSchema: ZodObject<T>,
	request: Request
) {
	const rawObj = processFormData(await request.formData(), zodSchema)
	const zodRes = zodSchema.safeParse(rawObj);
	if (!zodRes.success) {
		return {
			failure: fail(400, { errors: formatErrors(zodRes) })
		};
	} else {
		return {
			failure: false,
			data: zodRes.data
		};
	}
}
