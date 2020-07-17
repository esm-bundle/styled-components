const importMap = {
  imports: {
    react:
      "//unpkg.com/@esm-bundle/react@16.13.1/system/react.production.min.js",
    "react-is":
      "//unpkg.com/@esm-bundle/react-is@16.13.1/system/react-is.production.min.js",
  },
};

document.head.appendChild(
  Object.assign(document.createElement("script"), {
    type: "systemjs-importmap",
    textContent: JSON.stringify(importMap),
  })
);
