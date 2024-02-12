import _ from "lodash";
import Generator from "yeoman-generator";
// import validate from 'validate-npm-package-name';

import { AppAnswers } from "./AppAnswers.js";
import { AppOptions, AppOptionsType } from "./AppOptions.js";
import { Utils } from "../utils/Utils.js";

export class App extends Generator<AppOptionsType> {

  answers: AppAnswers = new AppAnswers();

  public constructor(args: string[], opts: AppOptions) {
    super(args, opts);

    this.option('license', { type: Boolean, description: "Prompts for a license", default: true });
    this.option('name', { type: String, description: "Project name", });
    this.option('readme', { type: String, description: "Content to insert in the README.md file", });
  }

  public initializing() {

    //if (this.options.name) {
    //  const packageNameValidity = validate(this.options.name);
    //  if (!packageNameValidity.validForNewPackages) {
    //    this.env.emit(
    //      'error',
    //      new Error(
    //        _.get(packageNameValidity, 'errors.0') ||
    //        'The name option is not a valid npm package name.'
    //      ));
    //  }
    //}
  }

  public async prompting() {

    if (this.options.name === undefined || this.options.name === '') {
      const result = await Utils.askForProjectName();
      console.log(`prompting: asked for name ${result.name}`);
      console.log(result);
      this.options.name = result.name;
    }

    const projectName = this.options.name;
    console.log('makeModuleName');
    const moduleName = Utils.makeModuleName(projectName, '');

    Object.assign(this.options, moduleName);
  }

  public async default() {

    console.log(this.options);
    //if (this.options.license) {
    //  this.composeWith(require.resolve('generator-license/app'), {});
    //}
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
