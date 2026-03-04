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
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2d$viewer$2f$core__$5b$external$5d$__$2840$react$2d$pdf$2d$viewer$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$core$29$__ = __turbopack_context__.i("[externals]/@react-pdf-viewer/core [external] (@react-pdf-viewer/core, cjs, [project]/node_modules/@react-pdf-viewer/core)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2d$viewer$2f$default$2d$layout__$5b$external$5d$__$2840$react$2d$pdf$2d$viewer$2f$default$2d$layout$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$default$2d$layout$29$__ = __turbopack_context__.i("[externals]/@react-pdf-viewer/default-layout [external] (@react-pdf-viewer/default-layout, cjs, [project]/node_modules/@react-pdf-viewer/default-layout)");
// Import the worker from the local node_modules instead of a URL
var __TURBOPACK__imported__module__$5b$externals$5d2f$pdfjs$2d$dist__$5b$external$5d$__$28$pdfjs$2d$dist$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$29$__ = __turbopack_context__.i("[externals]/pdfjs-dist [external] (pdfjs-dist, esm_import, [project]/node_modules/pdfjs-dist)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pdfjs$2d$dist__$5b$external$5d$__$28$pdfjs$2d$dist$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pdfjs$2d$dist__$5b$external$5d$__$28$pdfjs$2d$dist$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
'use client';
;
;
;
;
;
;
;
// This dynamically generates the correct URL based on the installed package version
const workerUrl = `https://unpkg.com/pdfjs-dist@${__TURBOPACK__imported__module__$5b$externals$5d2f$pdfjs$2d$dist__$5b$external$5d$__$28$pdfjs$2d$dist$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$29$__["version"]}/build/pdf.worker.min.mjs`;
function PdfViewer({ fileUrl }) {
    const defaultLayoutPluginInstance = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2d$viewer$2f$default$2d$layout__$5b$external$5d$__$2840$react$2d$pdf$2d$viewer$2f$default$2d$layout$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$default$2d$layout$29$__["defaultLayoutPlugin"])({
        sidebarTabs: (defaultTabs)=>[]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full h-full flex flex-col bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2d$viewer$2f$core__$5b$external$5d$__$2840$react$2d$pdf$2d$viewer$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$core$29$__["Worker"], {
            workerUrl: workerUrl,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2d$viewer$2f$core__$5b$external$5d$__$2840$react$2d$pdf$2d$viewer$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$core$29$__["Viewer"], {
                fileUrl: fileUrl + '/',
                plugins: [
                    defaultLayoutPluginInstance
                ],
                defaultScale: 1
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 24,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 23,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/PdfViewer.js",
        lineNumber: 22,
        columnNumber: 9
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/PdfViewer.js [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/PdfViewer.js [ssr] (ecmascript)"));
}),
"[externals]/@react-pdf-viewer/core [external] (@react-pdf-viewer/core, cjs, [project]/node_modules/@react-pdf-viewer/core)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@react-pdf-viewer/core-657f66b51ef1b61c", () => require("@react-pdf-viewer/core-657f66b51ef1b61c"));

module.exports = mod;
}),
"[externals]/@react-pdf-viewer/default-layout [external] (@react-pdf-viewer/default-layout, cjs, [project]/node_modules/@react-pdf-viewer/default-layout)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@react-pdf-viewer/default-layout-6e65e19af44445dd", () => require("@react-pdf-viewer/default-layout-6e65e19af44445dd"));

module.exports = mod;
}),
"[externals]/pdfjs-dist [external] (pdfjs-dist, esm_import, [project]/node_modules/pdfjs-dist)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pdfjs-dist-29912611d2e8a9df");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c0e4abf4._.js.map