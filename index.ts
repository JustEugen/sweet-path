// insert(...params: P extends string ? [Record<P, string | number>] : []) {

export type SweetPathParam = ":param" | "{{param}}" | "{param}" | "[param]";
export type SweetPathOptions = {
  path: SweetPathParam;
};

export class SweetPath<P extends string | void> {
  constructor(
    private readonly path: string,
    private readonly options?: Partial<SweetPathOptions>
  ) {
    if (this.options === undefined || this.options.path === undefined) {
      this.options = {
        ...this.options,
        path: ":param",
      };
    }
  }

  insert(pathParams: P extends void ? undefined | void | Record<any, any> : P extends string ? Record<P, any> : unknown) {
    if (!pathParams) {
      return this.path;
    }

    let finalPath = this.path;

    const pathParamsKeys = Object.keys(pathParams);

    for (let key of pathParamsKeys) {
      let replacerKey: string = "";

      if (this.options?.path) {
        replacerKey = this.options.path.replace("param", key);
      }

      finalPath = finalPath.replace(replacerKey, `${pathParams[key]}`);
    }

    return finalPath;
  }

  get original(): string {
    return this.path;
  }
}
