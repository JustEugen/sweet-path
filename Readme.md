# Sweet Path [![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/badge/npm-sweet--path-blue
[npm]: https://www.npmjs.com/package/sweet-path

Sweet Path is small utility class, for replacing path parameters. It's size around 1kb before gzip.

## Why Sweet Path ?

The best example of using Sweet Path is organizing your **routes** or **endpoints** in frontend application with saving types

## API

### Create SweetPath:
To create **SweetPath** instance you have to pass string in constructor`s first argument:

```js
const instance = new SweetPath("https://test.com");
```

If you have path parameters inside of URL, you should specify it in Generic. But this is only for thous, who using Typescript, it will give you additional syntax highlight when you will insert parameters, or error if you forget to specify them.

```js
const instance = new SweetPath<'entityId'>("https://test.com/entities/:entiityId");
```

If you have more than 1 path parameters it should be separated by **|** sign:

```js
const instance = new SweetPath<'bookId' | 'authorId'>("https://test.com/books/:bookId/authors/:authorId");
```

### To insert parameters:
1. **You have path parameters:**
```js
const instance = new SweetPath<'bookId' | 'authorId'>("https://test.com/books/:bookId/authors/:authorId");

instance.insert({ bookId: 1, authordId: 10 }); // https://test.com/books/1/authors/2

// if you didn't specify all parameters and you are using Typescript you'll get error
instance.insert({ bookId: 1 }); // Error: Argument of type '{}' is not assignable to parameter of type 'Record<"bookId" | "authorId", any>
```

2. **You don't have path parameters:**

```js
const instance = new SweetPath("https://test.com/books");

instance.insert({}); // https://test.com/books
```

### To get original:
Return the same string you have passed in **SweetPath** constructor
```js
const instance = new SweetPath<'bookId' | 'authorId'>("https://test.com/books/:bookId/authors/:authorId");

instance.original; // https://test.com/books/:bookId/authors/:authorId
```

