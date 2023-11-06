import { z } from 'zod';

export const schema = z.object({
	desc: z.string().min(5).max(15),
	age: z.coerce.number().min(18).max(160)
});
