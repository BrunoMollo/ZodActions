
export function processFormData(formData: FormData) {

	const arrayInputs = parseArrayInputsName(formData)

	if (arrayInputs.length === 0) return Object.fromEntries(formData)

	const finalMap = new Map();
	const arraysKeys = [...new Set(arrayInputs.map(x => x.arr))]

	arraysKeys.forEach((arrKey) => {
		finalMap.set(arrKey, []);

		const positions = [...new Set(arrayInputs.filter(x => x.arr === arrKey).map(x => x.pos))]
		const fields = [...new Set(arrayInputs.filter(x => x.arr === arrKey).map(x => x.field))]


		type _acessParam = { inArr: string, inPos: string, withField: string }
		const access = ({ inArr, inPos, withField }: _acessParam) => {
			return arrayInputs
				.filter(x => x.field === withField && x.pos === inPos && x.arr === inArr)
				.map(({ arr, pos, field }) => formData.get(`${arr}[${pos}].${field}`)?.toString() ?? '')
				.pop()
		}

		for (let pos of positions) {
			const auxMapObject = new Map();
			for (let field of fields) {
				auxMapObject.set(field, access({ inArr: arrKey, inPos: pos, withField: field }));
			}
			finalMap.get(arrKey).push(Object.fromEntries(auxMapObject));
		}
	})

	getSimpleFields(formData).forEach(name => {
		finalMap.set(name, formData.get(name))
	})

	const finalObject = Object.fromEntries(finalMap);
	return finalObject
}


function getSimpleFields(formData: FormData) {
	return [...formData.keys()]
		.filter(
			x => !(x.includes('.') && x.includes('[') && x.includes(']'))
		)
}

function parseArrayInputsName(formData: FormData) {
	return [...formData.keys()]
		.filter(x => x.includes('.') && x.includes('[') && x.includes(']'))
		.map(x => x.split(/[.[\]]/)) //separates by '.', '[', ']', you end up with an epmy string in the i=2
		.map(x => ({
			arr: x[0],
			pos: x[1],
			field: x[3],
		}))
}

