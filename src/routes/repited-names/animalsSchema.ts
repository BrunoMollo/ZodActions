import { z } from "zod";

export const animalsSchema = z.object({
	owner: z.string().min(3).max(10),
	pets: z.object({
		name: z.string().min(3).max(10),
	}).array()
})

