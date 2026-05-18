import { SweetPath } from "./index";

describe("SweetPath", () => {
  describe("original", () => {
    it("returns the original template when it has no params", () => {
      const route = new SweetPath("https://test.com/");

      expect(route.original).toEqual("https://test.com/");
    });

    it("returns the original template untouched when it has params", () => {
      const route = new SweetPath("https://test.com/:a/:b/:c");

      expect(route.original).toEqual("https://test.com/:a/:b/:c");
    });
  });

  describe("insert", () => {
    it("returns the template unchanged when the path has no params", () => {
      const route = new SweetPath("https://test.com/health");

      expect(route.insert()).toEqual("https://test.com/health");
    });

    it("replaces a single param", () => {
      const route = new SweetPath("https://test.com/users/:id");

      expect(route.insert({ id: 5 })).toEqual("https://test.com/users/5");
    });

    it("replaces multiple params", () => {
      const route = new SweetPath("https://test.com/users/:id/posts/:postId");

      expect(route.insert({ id: 1, postId: 2 })).toEqual(
        "https://test.com/users/1/posts/2"
      );
    });

    it("accepts string, number and boolean values", () => {
      const route = new SweetPath("https://test.com/:s/:n/:b");

      expect(route.insert({ s: "x", n: 0, b: false })).toEqual(
        "https://test.com/x/0/false"
      );
    });

    it("replaces every occurrence of a repeated param", () => {
      const route = new SweetPath("https://test.com/:id/related/:id");

      expect(route.insert({ id: 7 })).toEqual(
        "https://test.com/7/related/7"
      );
    });

    it("does not let one param name bleed into a longer one", () => {
      const route = new SweetPath("https://test.com/:id/:idCard");

      expect(route.insert({ id: 1, idCard: 2 })).toEqual(
        "https://test.com/1/2"
      );
    });

    it("URL-encodes param values", () => {
      const route = new SweetPath("https://test.com/:path");

      expect(route.insert({ path: "a/b c" })).toEqual(
        "https://test.com/a%2Fb%20c"
      );
    });

    it("leaves unknown ':' tokens untouched", () => {
      const route = new SweetPath("https://test.com:8080/:id");

      expect(route.insert({ id: 1 })).toEqual("https://test.com:8080/1");
    });
  });
});
