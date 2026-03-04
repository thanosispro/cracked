module.exports = [
"[project]/components/PdfViewer.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PdfViewer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2d$viewer$2f$core__$5b$external$5d$__$2840$react$2d$pdf$2d$viewer$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$core$29$__ = __turbopack_context__.i("[externals]/@react-pdf-viewer/core [external] (@react-pdf-viewer/core, cjs, [project]/node_modules/@react-pdf-viewer/core)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2d$viewer$2f$default$2d$layout__$5b$external$5d$__$2840$react$2d$pdf$2d$viewer$2f$default$2d$layout$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$default$2d$layout$29$__ = __turbopack_context__.i("[externals]/@react-pdf-viewer/default-layout [external] (@react-pdf-viewer/default-layout, cjs, [project]/node_modules/@react-pdf-viewer/default-layout)");
'use client';
;
;
;
;
;
;
// Worker URL for pdfjs-dist
const workerUrl = `https://unpkg.com/pdfjs-dist@5.5.207/build/pdf.worker.min.mjs`;
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
                lineNumber: 20,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 19,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/PdfViewer.js",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
}),
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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4d972929._.js.map