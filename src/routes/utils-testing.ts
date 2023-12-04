
let DELAY = 1000; //can channge in testing

export function setDelay(ms: number) {
	DELAY = ms
}

export function sleep() {
	return new Promise((resolve) => setTimeout(resolve, DELAY));
}


const default_fruits = [{ name: 'Banana' }, { name: 'Apple' }]
const fruits = [...default_fruits]
export const resetFruits = () => fruits.filter(x => !x).push(...default_fruits)
export const getFruits = () => fruits
