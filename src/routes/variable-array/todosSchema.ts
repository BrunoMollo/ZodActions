import { z } from 'zod';


export const todosSchema = z.object({
	todos: z.object({
		desc: z.string().min(5).max(15),
	}).array()
})

