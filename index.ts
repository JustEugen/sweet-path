// insert(...params: P extends string ? [Record<P, string | number>] : []) {

export class SweetPath<P extends string> {
  constructor(private readonly path: string) {}

  insert(pathParams: Record<P, any>) {
    let finalPath = this.path;

    const pathParamsKeys = Object.keys(pathParams) as Array<P>;

    for (let key of pathParamsKeys) {
      finalPath = finalPath.replace(`:${key}`, `${pathParams[key]}`);
    }

    return finalPath;
  }

  get original(): string {
    return this.path;
  }
}
