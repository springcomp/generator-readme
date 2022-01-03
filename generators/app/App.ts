import * as _ from "lodash";
import * as Generator from "yeoman-generator";
const extend = require('deep-extend');
import validatePackageName = require('validate-npm-package-name');

import { AppAnswers } from "./AppAnswers";
import { AppOptions } from "./AppOptions";
import { Utils } from "../utils/Utils";

export class App extends Generator {

  options: AppOptions = new AppOptions();
  answers: AppAnswers = new AppAnswers();

  public constructor(args: string[], opts: AppOptions) {
    super(args, opts);

    this.option('license', { type: Boolean, description: "Include license config", default: true });
    this.option('name', { type: String, description: "Project name", });
    this.option('readme', { type: String, description: "Content to insert in the README.md file", });
  }

  public initializing() {

    if (this.options.name) {
      const packageNameValidity = validatePackageName(this.options.name);
      if (!packageNameValidity.validForNewPackages) {
        this.emit(
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
      this.composeWith(require.resolve('generator-license/app'), {});
    }
  }

  public async writing() {

    const readmeTpl = _.template(this.fs.read(this.templatePath('README.md'), {}));
    const readme = readmeTpl({
      name: this.options.name
    });

    this.fs.write(this.destinationPath('README.md'), readme);

  }
}
