import { z } from 'zod';

export const petSchema = z.object({
	name: z.string().min(3)
});
