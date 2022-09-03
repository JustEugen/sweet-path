# Sweet Path [![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/badge/npm-sweet--path-blue
[npm]: https://www.npmjs.com/package/sweet-path

**Sweet Path** is small utility class, for replacing parameters in your text by specified pattern. Package is easy to use, Typescript oriented, and it's size around 1kb before gzip.

## How to use

By default, **Sweet Path** is using `:parameter` pattern, and it will replace it with your value. You can see all available patterns in options section [here](#options).

```js
const instance = new SweetPath("https://test.com/:entiityId");

// To replace parameter with your value
instance.insert({ entityId: 10 }); // "https://test.com/10"

// To get original string you passeed into SweetPath constructor;
instance.original; // "https://test.com/:entiityId"
```

If you don't have path parameters:

```js
const instance = new SweetPath("https://test.com");

instance.insert(); // "https://test.com"

instance.original; // "https://test.com"
```

### Instance methods and properties

**# instance.insert([,params])**

**# instance.original**

## Typescript type safety

**SweetPath** will care you passed all required params, but you have to specify it first in **SweetPath** [Generic](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content) as [Literal Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types).

```typescript
const instance = new SweetPath<"bookId" | "authorId">("https://test.com/books/:bookId/authors/:authorId");

instance.insert({ bookId: 10, authorId: 20 }); // https://test.com/books/10/authors/20

// In case you will not pass params specifed in Generic you'll get Typescript Error
instance.insert();

// Also will be Typescript Error
instance.insert({});

// Also will be Typescript Error
instance.insert({ bookId: 10 })
```

### Options

While creating SweetPath instance you are able to set additional options, **which are not required!**;

```js
{
  path: string;
}
```

`path` - set replace identifier. By default, SweetPath is using `:param` identifier.

- `:param`
- `{{param}}`
- `{param}`
- `[param]`

For example:

```js
const instance = new SweetPath("https://test.com/{{entiityId}}", { path: "{{param}}" });

instance.insert({ entityId: 10 }); // "https://test.com/10"

instance.original; // "https://test.com/{{entiityId}}"
```
