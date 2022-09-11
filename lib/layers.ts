import { Atom, Sexp } from "./sexp";

interface Keymap {
	[key: string]: Atom | Sexp;
}

export class Layer {
	static empty(): Layer {
		return new Layer(null, {});
	}

	constructor(public name: string, protected keymap: Keymap) {}

	public toString(): string {
		return "";
	}
}
