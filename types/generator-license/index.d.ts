declare module 'generator-license' {
	import Generator, { GeneratorOptions } from 'yeoman-generator';

	export const licences: string[];

	export type LicenseOptions = Partial<GeneratorOptions> & {
		name?: string;
		email?: string;
		website?: string;
		year?: string;
		licensePrompt?: string;
		defaultLicense?: string;
		license?: string;
		output?: string;
		publish?: boolean;
	};

	class GeneratorLicense extends Generator<LicenseOptions>{
	}

	export = GeneratorLicense;
}