import { Kmonad } from "../lib/kmonad";
import { Layer } from "../lib/layers";
import { Sexp } from "../lib/sexp";

const kmonad = new Kmonad({
	"input": new Sexp("device-file", [
		"/dev/input/by-id/usb-Razer_Razer_BlackWidow_Ultimate-if01-event-kbd",
	]),
	"output": new Sexp("uinput-sink", [
		"Kmonad output",
		"sleep 1 && setxkbmap -option compose:sclk; xmodmap -e 'keycode 131 = Hyper_L' -e 'remove Mod4 = Hyper_L' -e 'add Mod3 = Hyper_L'",
	]),
	"fallthrough": true,
	"allow-cmd": true,
});

const layer = new Layer("foo", {
	f: 'u',
});

kmonad.addLayer(layer);

console.log(kmonad);
console.log(kmonad.toString());
