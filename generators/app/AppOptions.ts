import { Options } from "../Options";
export class AppOptions extends Options {
	localName: string;
	scopeName: string;

	license: boolean = true;
	name: string;
	readme: string;
}