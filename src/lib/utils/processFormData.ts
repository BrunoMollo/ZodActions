
function retriveArrayInputsName(formData: FormData) {
	const arrayKeys = [...formData.keys()]
		.filter(x => x.includes('__'))
		.map(x => x.split('__')[0])

	return [...new Set(arrayKeys)]
}


export function processFormData(formData: FormData) {

	const allArrayInputNames = retriveArrayInputsName(formData)

	if (allArrayInputNames.length === 0) return Object.fromEntries(formData)

	const finalMap = new Map();

	allArrayInputNames.forEach((arrayKey) => {
		finalMap.set(arrayKey, []);

		const namesInsideArray = [...formData.keys()].filter(x => x.split('__')[0] === arrayKey)

		const valuesMatrix = namesInsideArray.map((name) => formData.getAll(name));

		for (let i = 0; i < valuesMatrix[0].length; i++) {
			const auxMapObject = new Map();
			for (let j = 0; j < namesInsideArray.length; j++) {
				auxMapObject.set(namesInsideArray[j].split('__')[1], valuesMatrix[j][i]);
			}
			finalMap.get(arrayKey).push(Object.fromEntries(auxMapObject));
		}

		formData.forEach((v, k) => {
			if (!allArrayInputNames.includes(k.split('__')[0])) {
				finalMap.set(k, v);
			}
		})
	})

	return Object.fromEntries(finalMap);

}
