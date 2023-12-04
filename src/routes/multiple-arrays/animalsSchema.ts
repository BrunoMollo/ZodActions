import { z } from "zod";

const petSchema = z.object({ name: z.string().min(3, 'Too short').max(10, 'Too long') })
export const animalsSchema = z.object({
	owner: z.string().min(3, 'Too short').max(10, 'Too long'),
	dogs: petSchema.array(),
	cats: petSchema.array()
})

