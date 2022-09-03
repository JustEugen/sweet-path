import { SweetPath } from "./index";

describe("QuickPath", () => {
  describe("original()", () => {
    it("should return original URL if URL has no path params", () => {
      const instance = new SweetPath("https://test.com/");

      expect(instance.original).toEqual("https://test.com/");
    });

    it("should return original URL if URL has path params", () => {
      const instance = new SweetPath(
        "https://test.com/:check1/:check2/:check3/:check4"
      );

      expect(instance.original).toEqual(
        "https://test.com/:check1/:check2/:check3/:check4"
      );
    });
  });

  describe("insert()", () => {
    it("should return original URL if URL has no path parameters", () => {
      const instance = new SweetPath("https://test.com/");

      expect(instance.insert()).toEqual("https://test.com/");
    });

    describe("path options", () => {
      it("should return URL with path parameters, if options path parameter is not defined", () => {
        const instance = new SweetPath<"check1" | "check2">(
          "https://test.com/:check1/:check2"
        );

        expect(
          instance.insert({
            check1: "hello",
            check2: 1,
          })
        ).toEqual("https://test.com/hello/1");
      });

      it("should return URL with path parameters, if options path parameter is ':param'", () => {
        const instance = new SweetPath<"check1" | "check2">(
          "https://test.com/:check1/:check2",
          {
            path: ":param",
          }
        );

        expect(
          instance.insert({
            check1: 0,
            check2: 1,
          })
        ).toEqual("https://test.com/0/1");
      });

      it("should return URL with path parameters, if options path parameter is '{param}'", () => {
        const instance = new SweetPath<"check1" | "check2">(
          "https://test.com/{check1}/{check2}",
          {
            path: "{param}",
          }
        );

        expect(
          instance.insert({
            check1: 0,
            check2: 1,
          })
        ).toEqual("https://test.com/0/1");
      });

      it("should return URL with path parameters, if options path parameter is '{param}'", () => {
        const instance = new SweetPath<"check1" | "check2">(
          "https://test.com/{{check1}}/{{check2}}",
          {
            path: "{{param}}",
          }
        );

        expect(
          instance.insert({
            check1: 0,
            check2: 1,
          })
        ).toEqual("https://test.com/0/1");
      });

      it("should return URL with path parameters, if options path parameter is '{param}'", () => {
        const instance = new SweetPath<"check1" | "check2">(
          "https://test.com/[check1]/[check2]",
          {
            path: "[param]",
          }
        );

        expect(
          instance.insert({
            check1: 0,
            check2: 1,
          })
        ).toEqual("https://test.com/0/1");
      });
    });
  });
});
