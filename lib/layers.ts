import { Expression } from "./sexp";

interface Keymap {
	[key: string]: Expression;
}

export class Layer {
	constructor(public name: string, protected keymap: Keymap) {}

	public toString(): string {
		const result = [
		];

		return `(deflayer ${result.join(' ')})`;
	}
}

export class Source {
	constructor(protected keys: Keymap) {}

	public toString(): string {
		const result = [
		];

		return `(defsrc ${result.join(' ')})`;
	}
}
