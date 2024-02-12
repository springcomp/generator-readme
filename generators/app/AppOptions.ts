import { OptionsType } from "../Options.js";
export type AppOptionsType = OptionsType & {
	license: boolean;
	name: string;
	readme: string;
};

export class AppOptions {
	localName: string;
	scopeName: string;

  // this is required to workaround issue
  // https://github.com/yeoman/yeoman/issues/1717 
  namespace = "yeoman:@springcomp/readme";

	license: boolean = true;
	name: string;
	readme: string;
}
