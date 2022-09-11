export type Atom = boolean | string | number | Key;

export type Expression = Atom | Sexp;

export type SexpMap = { [key: string]: Expression };

export class Key {
	constructor(public name: string) {}

	public toString(): string {
		return this.name;
	}
}

export class Sexp {
	static fromObject(name: string, values: SexpMap) {
		const list = [];

		for (let key of Object.keys(values)) {
			list.push(new Key(key));
			list.push(values[key]);
		}

		return new Sexp(name, list);
	}

	constructor(public name: string, public list: Array<Expression>) {}

	public toString(): string {
		const result = [
			this.name,
			...this.list.map((item) => {
				if (typeof item === "string") return `"${item}"`;
				return item.toString();
			}),
		];

		return `(${result.join(' ')})`;
	}
}
