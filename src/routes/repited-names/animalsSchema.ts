import { string, z } from "zod";

export const animalsSchema = z.object({
	name: string().min(3).max(10)
}).array()
