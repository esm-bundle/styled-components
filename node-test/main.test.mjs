describe("@esm-bundle/styled-components", () => {
  it("can load the esm bundle without dying", () => {
    return import("../esm/styled-components.js");
  });

  it("has API exports defined", async () => {
    const { default: styled, keyframes } = await import(
      "../esm/styled-components.js"
    );

    expect(styled.div).not.to.equal(undefined);
    expect(keyframes).not.to.equal(undefined);
    expect(styled.keyframes).to.equal(undefined);
  });

  it("has API exports defined", async () => {
    const { default: styled, keyframes } = await import(
      "../esm/styled-components.min.js"
    );

    expect(styled.div).not.to.equal(undefined);
    expect(keyframes).not.to.equal(undefined);
    expect(styled.keyframes).to.equal(undefined);
  });
});
