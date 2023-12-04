import { writable } from "svelte/store";

export function createSlots(min: number = 0, max: number) {

	type Slot = Array<number> & { canAdd: () => boolean, canRemove: () => boolean }

	const value = [0] as Slot
	value.canAdd = function() {
		return this.length < max
	}
	value.canRemove = function() {
		return this.length > min
	}
	const { subscribe, update } = writable(value);
	const add = () => {
		update((x) => {
			if (x.length < max) {
				x.push(x.length);
			}
			return x;
		});
	};
	const remove = () => {
		update((x) => {
			if (x.length > min) {
				x.pop();
			}
			return x;
		});
	};

	return { subscribe, add, remove: remove }

}
