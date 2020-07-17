describe("@esm-bundle/styled-components esm import", () => {
  it("can load", () => {
    return import("/base/esm/styled-components.resolved.js");
  });
});

describe("@esm-bundle/styled-components System.register import", () => {
  it("can load", () => {
    return System.import("/base/system/styled-components.js").then((module) => {
      expect(module.default).toBeDefined();
      expect(module.__esModule).toEqual(true);
      // Default export
      expect(typeof module.default.div).toBe("function");
      // Named export
      expect(typeof module.keyframes).toBe("function");
    });
  });

  it("can load", () => {
    return System.import("/base/system/styled-components.min.js").then(
      (module) => {
        expect(module.default).toBeDefined();
        expect(module.__esModule).toEqual(true);
        // Default export
        expect(typeof module.default.div).toBe("function");
        // Named export
        expect(typeof module.keyframes).toBe("function");
      }
    );
  });
});
