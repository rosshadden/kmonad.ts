import { Atom, Sexp } from "./sexp";
import { Layer } from "./layers";

interface KmonadConfig {
	"input": Atom | Sexp;
	"output": Atom | Sexp;
	"fallthrough": Atom | Sexp;
	"allow-cmd": Atom | Sexp;
}

export class Kmonad {
	private source: Layer = Layer.empty();
	private layers: Array<Layer> = [];

	constructor(protected config: KmonadConfig) {}

	public setSource(layer: Layer) {
		this.source = layer;
	}

	public addLayer(layer: Layer) {
		this.layers.push(layer);
	}

	public toString(): string {
		let result = "";

		result += Sexp.fromObject("defcfg", {
			input: this.config.input,
			output: this.config.output,
			fallthrough: this.config.fallthrough,
			"allow-cmd": this.config["allow-cmd"],
		});

		result += this.source.toString();

		for (let layer of this.layers) {
			result += layer.toString();
		}

		return result;
	}
}
