export function processFormdataWithArrays(formData: FormData, formElement: HTMLFormElement) {

	const elementsWithDataArray = [...formElement.querySelectorAll('[data-array]')];
	//@ts-ignore
	const arraysKeys = new Set(elementsWithDataArray.map((x) => x.dataset.array).filter(x => x));
	const finalMap = new Map();

	arraysKeys.forEach((arrKey) => {
		finalMap.set(arrKey, []);
		const namesInsideArray = [
			...new Set(
				//@ts-ignore
				elementsWithDataArray.filter((x) => x.dataset.array === arrKey).map((x) => x.name)
			)
		];

		const valuesMatrix = namesInsideArray.map((name) => formData.getAll(name));

		for (let i = 0; i < valuesMatrix[0].length; i++) {
			const auxMapObject = new Map();
			for (let j = 0; j < namesInsideArray.length; j++) {
				auxMapObject.set(namesInsideArray[j], valuesMatrix[j][i]);
			}
			finalMap.get(arrKey).push(Object.fromEntries(auxMapObject));
		}

		formData.forEach((v, k) => {
			//@ts-ignore
			const exclude = elementsWithDataArray.map((x) => x.name);
			if (!exclude.includes(k)) {
				finalMap.set(k, v);
			}
		})
	})

	return Object.fromEntries(finalMap);

}
