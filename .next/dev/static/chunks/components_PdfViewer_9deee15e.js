(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/PdfViewer.js [client] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_aa0927ba._.js",
  "static/chunks/components_PdfViewer_31618ca7.js",
  {
    "path": "static/chunks/node_modules_react-pdf_dist_Page_8802e371._.css",
    "included": [
      "[project]/node_modules/react-pdf/dist/Page/AnnotationLayer.css [client] (css)",
      "[project]/node_modules/react-pdf/dist/Page/TextLayer.css [client] (css)"
    ],
    "moduleChunks": [
      "static/chunks/node_modules_react-pdf_dist_Page_AnnotationLayer_css_65f1660e._.single.css",
      "static/chunks/node_modules_react-pdf_dist_Page_TextLayer_css_65f1660e._.single.css"
    ]
  },
  "static/chunks/components_PdfViewer_237966eb.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/components/PdfViewer.js [client] (ecmascript)");
    });
});
}),
]);