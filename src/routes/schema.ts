import { z } from 'zod';

export const schema = z.object({
	desc: z.string().min(2).max(15)
});
