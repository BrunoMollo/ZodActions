import type { SafeParseError } from "zod";



export type StringifyFields<T> = {
	[K in keyof T]: T[K] extends Object[] ? { at: ((index: number, field: keyof T[K][0]) => string | false) } : string;
};


export function formatErrors<T>(zodRes: SafeParseError<T>) {
	if (!zodRes.success) {
		const err = zodRes.error.format();

		for (let key_1 in err) { //key: owner, pets
			if (key_1 === '_errors') continue

			//@ts-ignore
			if (Object.keys(err[key_1]).length === 1) {
				//@ts-ignore
				err[key_1] = err[key_1]._errors[0] ?? false;
			} else {
				//@ts-ignore
				err[key_1].at = create_lookup_function(err[key_1])
			}
		}
		return err as StringifyFields<T>
	}
	return {}
}




function create_lookup_function(original: any): any {
	return (index: number, field: string) => {
		if (original && original[index]) {
			return original[index][field]._errors[0] ?? false
		}
		else {
			return false
		}

	}
}

