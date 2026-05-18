# Sweet Path [![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/badge/npm-sweet--path-blue
[npm]: https://www.npmjs.com/package/sweet-path

**Sweet Path** is a tiny, type-safe utility for filling `:param` placeholders in URL paths.

## Features

- **Tiny:** around 1kb before gzip, zero runtime dependencies
- **TS Safe:** parameters are inferred from a path

## Install

```sh
npm install sweet-path
```

## Usage

```ts
import { SweetPath } from "sweet-path";

const route = new SweetPath("https://api.com/users/:id");

route.insert({ id: 10 });
//             ^^ "id" inferred from the path - autocompleted and required
// "https://api.com/users/10"

route.original;
// "https://api.com/users/:id"
```

Multiple params:

```ts
const route = new SweetPath("https://api.com/books/:bookId/authors/:authorId");

route.insert({ bookId: 10, authorId: 20 });
//             ^^^^^^      ^^^^^^^^ inferred from the path - autocompleted and required
// "https://api.com/books/10/authors/20"
```

No params - `insert()` takes no arguments:

```ts
const route = new SweetPath("https://api.com/health");

route.insert();
//     ^^^^^^ path has no params, so insert() takes no arguments
// "https://api.com/health"
```

## Type safety

You do not need to specify the path params, as they inferred from the string you are providing, and for usage you have to specify the exact parameters that were inferred:

```ts
const route = new SweetPath("https://api.com/books/:bookId/authors/:authorId");

route.insert({ bookId: 10, authorId: 20 }); // ✅ ok

route.insert();               // ❌ params required
route.insert({});             // ❌ missing bookId, authorId
route.insert({ bookId: 10 }); // ❌ missing authorId
```

Param values may be `string`, `number`, or `boolean`, and are URL-encoded:

```ts
new SweetPath("https://api.com/search/:term").insert({ term: "a/b c" });
// "https://api.com/search/a%2Fb%20c"
```

## API

### `new SweetPath(path)`

`path` - a URL or path template. Params are segments written as `/:name`.

### `insert(params?)`

Replace `path` parameters, and returns a `string`. When the path has no
params, call `insert()` with no arguments. Unknown `:` tokens that are not path
segments (e.g. a `:8080` port) are left untouched.

### `original`

The original template string, unchanged.
