import { z } from 'zod';

export const fruitSchema = z.object({
	name: z.string().min(5, 'too short').max(15, 'too long'),
});
