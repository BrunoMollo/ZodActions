import { z, type SafeParseError } from "zod";


export type StringifyFields<T> = {
	[K in keyof T]: T[K] extends Object[] ? { [SK in keyof T[K][0]]: string }[] : string;
};

const aaaa = z.object({ name: z.string(), arr: z.object({ foo: z.number() }).array() })
type qqqqq = StringifyFields<typeof aaaa._type>

export function formatErrors<T>(zodRes: SafeParseError<T>) {

	if (!zodRes.success) {
		const err = zodRes.error.format();

		for (let key in err) { //key: owner, pets
			if (key === '_errors') continue
			//@ts-ignore
			if (Object.entries(err[key]).length === 1) {
				//@ts-ignore
				err[key] = err[key]._errors[0];
			} else {
				//@ts-ignore
				for (let i = 0; err[key][i]; i++) { //pets[0], pets[1]
					//@ts-ignore
					for (let subkey in err[key][i]) { // name, age
						if (subkey === '_errors') continue
						//@ts-ignore

						err[key][i][subkey] = err[key][i][subkey]._errors[0] ?? false //err.[pets][0][name]._errors[0]
					}
				}
			}
		}
		return err as StringifyFields<T>
	}
	return {}
}




