export type Atom = boolean | string | number | Key;

export class Key {
	constructor(public name: string) {}

	public toString(): string {
		return this.name;
	}
}

export class Sexp {
	static fromObject(name: string, values: { [key: string]: Sexp | Atom }) {
		const list = [];

		for (let key of Object.keys(values)) {
			list.push(new Key(key));
			list.push(values[key]);
		}

		return new Sexp(name, list);
	}

	constructor(public name: string, public list: Array<Sexp | Atom>) {}

	public toString(): string {
		let result = [
			this.name,
			...this.list.map((item) => {
				if (typeof item === "string") return `"${item}"`;
				return item.toString();
			}),
		];

		return `(${result.join(' ')})`;
	}
}
