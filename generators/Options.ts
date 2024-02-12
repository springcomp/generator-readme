import { BaseOptions } from "yeoman-generator";
export type OptionsType = BaseOptions & {
  // this is required to workaround issue
  // https://github.com/yeoman/yeoman/issues/1717 
  namespace: string;
};