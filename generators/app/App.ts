import _ from "lodash";
import Generator from "yeoman-generator";
import validate from 'validate-npm-package-name';

import { AppAnswers } from "./AppAnswers.js";
import { AppOptions } from "./AppOptions.js";
import { Utils } from "../utils/Utils.js";
import { fileURLToPath } from 'node:url';

import GeneratorLicense, { LicenseOptions } from 'generator-license';

import { resolve } from 'import-meta-resolve';

export class App extends Generator<AppOptions> {

  answers: AppAnswers = new AppAnswers();

  public constructor(args: string[], opts: AppOptions) {
    super(args, opts);

    console.log(opts);

    this.option('license', { type: Boolean, description: "Prompts for a license", default: true });
    this.option('name', { type: String, description: "Project name", });
    this.option('readme', { type: String, description: "Content to insert in the README.md file", });
  }

  public initializing() {

    if (this.options.name) {
      const packageNameValidity = validate(this.options.name);
      if (!packageNameValidity.validForNewPackages) {
        this.env.emit(
          'error',
          new Error(
            _.get(packageNameValidity, 'errors.0') ||
            'The name option is not a valid npm package name.'
          ));
      }
    }
  }

  public async prompting() {

    if (this.options.name === undefined || this.options.name === '') {
      const result = await Utils.askForProjectName();
      this.options.name = result.name;
    }

    const projectName = this.options.name;
    const moduleName = Utils.makeModuleName(projectName, '');

    Object.assign(this.options, moduleName);
  }

  public async default() {

    if (this.options.license) {
      const path = resolve('generator-license', import.meta.url);
      const localPath = fileURLToPath(path);
      console.log(localPath);
      const licenseOpts: LicenseOptions = {
        publish: false,
      };
      await this.composeWith<GeneratorLicense>(localPath, licenseOpts);
    }
  }

  public async writing() {

    var readme = this.options.readme;

    if (readme === undefined || readme === '') {
      const templatePath = this.templatePath('README.md');
      const templateContent = this.fs.read(templatePath, {}) || undefined;
      const readmeTpl = _.template(templateContent);
      readme = readmeTpl({
        name: this.options.name
      });
    }

    this.fs.write(this.destinationPath('README.md'), readme);
  }
}
