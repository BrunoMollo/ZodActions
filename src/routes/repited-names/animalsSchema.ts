import { z } from "zod";

const petSchema = z.object({ name: z.string().min(3).max(10) })
export const animalsSchema = z.object({
	owner: z.string().min(3).max(10),
	dogs: petSchema.array(),
	cats: petSchema.array()
})

