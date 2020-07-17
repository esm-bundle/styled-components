describe("@esm-bundle/styled-components", () => {
  it("can load the ESM bundle", () => {
    return import("/base/esm/styled-components.resolved.js");
  });

  it("can load the System.register bundle", () => {
    return System.import("/base/system/styled-components.js").then((module) => {
      expect(module.default).toBeDefined();
      expect(module.__esModule).toEqual(true);
      // Default export
      expect(typeof module.default.div).toBe("function");
      // Named export
      expect(typeof module.keyframes).toBe("function");
    });
  });
});
