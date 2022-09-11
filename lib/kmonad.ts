import { Expression, Sexp, SexpMap } from "./sexp";
import { Layer, Source } from "./layers";

interface KmonadConfig {
	"input": Expression;
	"output": Expression;
	"fallthrough": Expression;
	"allow-cmd": Expression;
}

export class Kmonad {
	private source: Layer = new Source({});
	private aliases: SexpMap = {};
	private layers: Array<Layer> = [];

	constructor(protected config: KmonadConfig) {}

	public setSource(layer: Layer) {
		this.source = layer;
	}

	public setAlias(key: string, value: Expression) {
		this.aliases[key] = value;
	}

	public setAliases(map: SexpMap) {
		for (let key of Object.keys(map)) {
			this.aliases[key] = map[key];
		}
	}

	public addLayer(layer: Layer) {
		this.layers.push(layer);
	}

	public toString(): string {
		const result = [
			Sexp.fromObject("defcfg", {
				input: this.config.input,
				output: this.config.output,
				fallthrough: this.config.fallthrough,
				"allow-cmd": this.config["allow-cmd"],
			}).toString(),

			this.source.toString(),

			Sexp.fromObject("defalias", this.aliases).toString(),

			...this.layers.map((layer) => layer.toString()),
		];

		return result.join('\n');
	}
}
