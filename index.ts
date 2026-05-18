export type PathParamValue = string | number | boolean;

export type PathParam<S extends string> =
  S extends `${infer _Head}/:${infer Rest}`
    ? Rest extends `${infer Name}/${infer Tail}`
      ? Name | PathParam<`/${Tail}`>
      : Rest
    : never;

export type PathParams<P extends string> = Record<P, PathParamValue>;

type InsertArgs<P extends string> = [P] extends [never]
  ? []
  : [params: PathParams<P>];

export class SweetPath<S extends string = string> {
  constructor(private readonly path: S) {}

  insert(...args: InsertArgs<PathParam<S>>): string {
    const [params] = args as [Record<string, PathParamValue | undefined>?];

    if (!params) {
      return this.path;
    }

    return this.path.replace(/\/:([A-Za-z0-9_]+)/g, (token, key) => {
      const value = params[key];

      if (value === undefined) {
        return token;
      }

      return "/" + encodeURIComponent(String(value));
    });
  }

  get original(): string {
    return this.path;
  }
}
