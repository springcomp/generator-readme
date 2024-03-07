import { BaseOptions } from "yeoman-generator";
export type AppOptions = BaseOptions & {
	license: boolean;
	name: string;
	readme: string;
};
