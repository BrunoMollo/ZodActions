
export let DELAY = 1000; //can channge in testing

export function setDelay(ms: number) {
	DELAY = ms
}

export function sleep() {
	return new Promise((resolve) => setTimeout(resolve, DELAY));
}
