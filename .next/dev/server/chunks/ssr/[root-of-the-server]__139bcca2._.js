module.exports = [
"[project]/components/PdfViewer.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>PdfViewer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$pdf__$5b$external$5d$__$28$react$2d$pdf$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$pdf$29$__ = __turbopack_context__.i("[externals]/react-pdf [external] (react-pdf, esm_import, [project]/node_modules/react-pdf)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$pdf__$5b$external$5d$__$28$react$2d$pdf$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$pdf$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$pdf__$5b$external$5d$__$28$react$2d$pdf$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$pdf$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
'use client';
;
;
;
// Set up the worker automatically from a CDN
__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$pdf__$5b$external$5d$__$28$react$2d$pdf$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$pdf$29$__["pdfjs"].GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$pdf__$5b$external$5d$__$28$react$2d$pdf$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$pdf$29$__["pdfjs"].version}/build/pdf.worker.min.mjs`;
;
;
function PdfViewer({ fileUrl }) {
    const [numPages, setNumPages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center bg-slate-100 p-4 overflow-auto h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$pdf__$5b$external$5d$__$28$react$2d$pdf$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$pdf$29$__["Document"], {
            file: fileUrl + '/',
            onLoadSuccess: onDocumentLoadSuccess,
            loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-indigo-600",
                children: "Loading PDF..."
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 25,
                columnNumber: 26
            }, void 0),
            children: Array.from(new Array(numPages), (el, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$pdf__$5b$external$5d$__$28$react$2d$pdf$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$pdf$29$__["Page"], {
                    pageNumber: index + 1,
                    renderTextLayer: true,
                    renderAnnotationLayer: true,
                    className: "mb-4 shadow-lg",
                    // Adjust width to fit your modal
                    width: window.innerWidth > 600 ? 600 : window.innerWidth - 40
                }, `page_${index + 1}`, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 29,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 22,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/PdfViewer.js",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/PdfViewer.js [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/PdfViewer.js [ssr] (ecmascript)"));
}),
"[externals]/react-pdf [external] (react-pdf, esm_import, [project]/node_modules/react-pdf)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-pdf-600edb03bdcb98f4");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__139bcca2._.js.map