// insert(...params: P extends string ? [Record<P, string | number>] : []) {

export type SweetPathParam = ":param" | "{{param}}" | "{param}" | "[param]";
export type SweetPathOptions = {
  path: SweetPathParam;
};

export class SweetPath<P extends string> {
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

  insert(pathParams: Record<P, any>) {
    let finalPath = this.path;

    const pathParamsKeys = Object.keys(pathParams) as Array<P>;

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
