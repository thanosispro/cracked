(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/PdfViewer.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PdfViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__ = __turbopack_context__.i("[project]/node_modules/react-pdf/dist/Document.js [client] (ecmascript) <export default as Document>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__ = __turbopack_context__.i("[project]/node_modules/react-pdf/dist/Page.js [client] (ecmascript) <export default as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.mjs [client] (ecmascript) <export * as pdfjs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [client] (ecmascript) <export default as ChevronLeft>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Set up the worker automatically from a CDN
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].version}/build/pdf.worker.min.mjs`;
;
;
function PdfViewer(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(69);
    if ($[0] !== "32c09a1301105ecd2d4c3f39e427a51328983c8d63bf9532c8916b92c14a664b") {
        for(let $i = 0; $i < 69; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "32c09a1301105ecd2d4c3f39e427a51328983c8d63bf9532c8916b92c14a664b";
    }
    const { fileUrl, fileName, onDownload, onClose, isFullScreen: t1 } = t0;
    const initialFullScreen = t1 === undefined ? true : t1;
    const [numPages, setNumPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isFullScreen, setIsFullScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(initialFullScreen);
    const [rotate, setRotate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = function onDocumentLoadSuccess(t3) {
            const { numPages: numPages_0 } = t3;
            setNumPages(numPages_0);
        };
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    const onDocumentLoadSuccess = t2;
    let t3;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "PdfViewer[handleZoomIn]": ()=>setScale(_PdfViewerHandleZoomInSetScale)
        })["PdfViewer[handleZoomIn]"];
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const handleZoomIn = t3;
    let t4;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "PdfViewer[handleZoomOut]": ()=>setScale(_PdfViewerHandleZoomOutSetScale)
        })["PdfViewer[handleZoomOut]"];
        $[3] = t4;
    } else {
        t4 = $[3];
    }
    const handleZoomOut = t4;
    let t5;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "PdfViewer[handleRotate]": ()=>setRotate(_PdfViewerHandleRotateSetRotate)
        })["PdfViewer[handleRotate]"];
        $[4] = t5;
    } else {
        t5 = $[4];
    }
    const handleRotate = t5;
    const t6 = `flex flex-col h-full bg-[#0a0f1e] overflow-hidden ${isFullScreen ? "fixed inset-0 z-[60]" : "relative rounded-xl border border-white/10 shadow-2xl"}`;
    let t7;
    if ($[5] !== onClose) {
        t7 = onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClose,
            className: "p-2 hover:bg-white/5 rounded-lg transition-colors text-rose-400",
            title: "Go Back / Close",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 78,
                columnNumber: 147
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 78,
            columnNumber: 21
        }, this);
        $[5] = onClose;
        $[6] = t7;
    } else {
        t7 = $[6];
    }
    const t8 = fileName || "PDF Viewer";
    let t9;
    if ($[7] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-sm font-bold text-slate-200 truncate max-w-[200px]",
            children: t8
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 87,
            columnNumber: 10
        }, this);
        $[7] = t8;
        $[8] = t9;
    } else {
        t9 = $[8];
    }
    let t10;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[10px] text-slate-500 uppercase tracking-widest font-bold",
            children: "Document Preview"
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 95,
            columnNumber: 11
        }, this);
        $[9] = t10;
    } else {
        t10 = $[9];
    }
    let t11;
    if ($[10] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden sm:block",
            children: [
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 102,
            columnNumber: 11
        }, this);
        $[10] = t9;
        $[11] = t11;
    } else {
        t11 = $[11];
    }
    let t12;
    if ($[12] !== t11 || $[13] !== t7) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: [
                t7,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 110,
            columnNumber: 11
        }, this);
        $[12] = t11;
        $[13] = t7;
        $[14] = t12;
    } else {
        t12 = $[14];
    }
    let t13;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleZoomOut,
            className: "p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 119,
                columnNumber: 136
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 119,
            columnNumber: 11
        }, this);
        $[15] = t13;
    } else {
        t13 = $[15];
    }
    let t14;
    if ($[16] !== scale) {
        t14 = Math.round(scale * 100);
        $[16] = scale;
        $[17] = t14;
    } else {
        t14 = $[17];
    }
    let t15;
    if ($[18] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-mono text-slate-300 w-12 text-center",
            children: [
                t14,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 134,
            columnNumber: 11
        }, this);
        $[18] = t14;
        $[19] = t15;
    } else {
        t15 = $[19];
    }
    let t16;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleZoomIn,
            className: "p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 142,
                columnNumber: 135
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 142,
            columnNumber: 11
        }, this);
        $[20] = t16;
    } else {
        t16 = $[20];
    }
    let t17;
    if ($[21] !== t15) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1",
            children: [
                t13,
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 149,
            columnNumber: 11
        }, this);
        $[21] = t15;
        $[22] = t17;
    } else {
        t17 = $[22];
    }
    let t18;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleRotate,
            className: "p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all hidden sm:block",
            title: "Rotate",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 157,
                columnNumber: 166
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[23] = t18;
    } else {
        t18 = $[23];
    }
    let t19;
    if ($[24] !== t17) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 sm:gap-4 bg-black/20 p-1 rounded-xl border border-white/5",
            children: [
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 164,
            columnNumber: 11
        }, this);
        $[24] = t17;
        $[25] = t19;
    } else {
        t19 = $[25];
    }
    let t20;
    if ($[26] !== onDownload) {
        t20 = onDownload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onDownload,
            className: "p-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-all border border-indigo-500/20",
            title: "Download PDF",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 172,
                columnNumber: 215
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 172,
            columnNumber: 25
        }, this);
        $[26] = onDownload;
        $[27] = t20;
    } else {
        t20 = $[27];
    }
    let t21;
    if ($[28] !== isFullScreen) {
        t21 = ({
            "PdfViewer[<button>.onClick]": ()=>setIsFullScreen(!isFullScreen)
        })["PdfViewer[<button>.onClick]"];
        $[28] = isFullScreen;
        $[29] = t21;
    } else {
        t21 = $[29];
    }
    const t22 = isFullScreen ? "Minimize" : "Maximize";
    let t23;
    if ($[30] !== isFullScreen) {
        t23 = isFullScreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 191,
            columnNumber: 26
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 191,
            columnNumber: 52
        }, this);
        $[30] = isFullScreen;
        $[31] = t23;
    } else {
        t23 = $[31];
    }
    let t24;
    if ($[32] !== t21 || $[33] !== t22 || $[34] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t21,
            className: "p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white",
            title: t22,
            children: t23
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 199,
            columnNumber: 11
        }, this);
        $[32] = t21;
        $[33] = t22;
        $[34] = t23;
        $[35] = t24;
    } else {
        t24 = $[35];
    }
    let t25;
    if ($[36] !== onClose) {
        t25 = onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClose,
            className: "p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all border border-rose-500/20 inline-flex",
            title: "Close",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 209,
                columnNumber: 206
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 209,
            columnNumber: 22
        }, this);
        $[36] = onClose;
        $[37] = t25;
    } else {
        t25 = $[37];
    }
    let t26;
    if ($[38] !== t20 || $[39] !== t24 || $[40] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t20,
                t24,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 217,
            columnNumber: 11
        }, this);
        $[38] = t20;
        $[39] = t24;
        $[40] = t25;
        $[41] = t26;
    } else {
        t26 = $[41];
    }
    let t27;
    if ($[42] !== t12 || $[43] !== t19 || $[44] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between p-3 bg-[#0f172a] border-b border-white/10 backdrop-blur-md z-10",
            children: [
                t12,
                t19,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 227,
            columnNumber: 11
        }, this);
        $[42] = t12;
        $[43] = t19;
        $[44] = t26;
        $[45] = t27;
    } else {
        t27 = $[45];
    }
    const t28 = fileUrl.endsWith("/") ? fileUrl : fileUrl + "/";
    let t29;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-[60vh] text-indigo-400 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                    className: "animate-spin",
                    size: 48
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 238,
                    columnNumber: 101
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-bold text-sm uppercase tracking-widest animate-pulse",
                    children: "Initializing Document..."
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 238,
                    columnNumber: 148
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 238,
            columnNumber: 11
        }, this);
        $[46] = t29;
    } else {
        t29 = $[46];
    }
    let t30;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-[60vh] text-rose-400 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 48
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 245,
                    columnNumber: 99
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-bold text-sm uppercase tracking-widest",
                    children: "Failed to load PDF"
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 245,
                    columnNumber: 114
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 245,
            columnNumber: 11
        }, this);
        $[47] = t30;
    } else {
        t30 = $[47];
    }
    let t31;
    if ($[48] !== numPages || $[49] !== rotate || $[50] !== scale) {
        let t32;
        if ($[52] !== rotate || $[53] !== scale) {
            t32 = ({
                "PdfViewer[Array.from()]": (el, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__["Page"], {
                        pageNumber: index + 1,
                        scale: scale,
                        rotate: rotate,
                        renderTextLayer: true,
                        renderAnnotationLayer: true,
                        className: "shadow-2xl border border-white/5 mb-4"
                    }, `page_${index + 1}`, false, {
                        fileName: "[project]/components/PdfViewer.js",
                        lineNumber: 255,
                        columnNumber: 51
                    }, this)
            })["PdfViewer[Array.from()]"];
            $[52] = rotate;
            $[53] = scale;
            $[54] = t32;
        } else {
            t32 = $[54];
        }
        t31 = Array.from(new Array(numPages || 0), t32);
        $[48] = numPages;
        $[49] = rotate;
        $[50] = scale;
        $[51] = t31;
    } else {
        t31 = $[51];
    }
    let t32;
    if ($[55] !== t28 || $[56] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-auto bg-[#020617] scrollbar-hide flex justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pdf-container shadow-2xl origin-top transition-transform duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__["Document"], {
                    file: t28,
                    onLoadSuccess: onDocumentLoadSuccess,
                    loading: t29,
                    error: t30,
                    children: t31
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 273,
                    columnNumber: 188
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 273,
                columnNumber: 101
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 273,
            columnNumber: 11
        }, this);
        $[55] = t28;
        $[56] = t31;
        $[57] = t32;
    } else {
        t32 = $[57];
    }
    let t33;
    if ($[58] !== numPages) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[10px] text-slate-500 font-medium",
            children: [
                numPages,
                " Pages Detected"
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 282,
            columnNumber: 11
        }, this);
        $[58] = numPages;
        $[59] = t33;
    } else {
        t33 = $[59];
    }
    let t34;
    if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] text-slate-500 font-medium flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/components/PdfViewer.js",
                        lineNumber: 290,
                        columnNumber: 119
                    }, this),
                    "Secure Viewer"
                ]
            }, void 0, true, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 290,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 290,
            columnNumber: 11
        }, this);
        $[60] = t34;
    } else {
        t34 = $[60];
    }
    let t35;
    if ($[61] !== t33) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-2 bg-[#0f172a] border-t border-white/10 flex justify-between items-center",
            children: [
                t33,
                t34
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 297,
            columnNumber: 11
        }, this);
        $[61] = t33;
        $[62] = t35;
    } else {
        t35 = $[62];
    }
    let t36;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            id: "6b86bfffb44797fb",
            children: ".pdf-container .react-pdf__Page{margin-bottom:2rem!important}.pdf-container canvas{max-width:100%;height:auto!important}.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}"
        }, void 0, false, void 0, this);
        $[63] = t36;
    } else {
        t36 = $[63];
    }
    let t37;
    if ($[64] !== t27 || $[65] !== t32 || $[66] !== t35 || $[67] !== t6) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t6,
            children: [
                t27,
                t32,
                t35,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 312,
            columnNumber: 11
        }, this);
        $[64] = t27;
        $[65] = t32;
        $[66] = t35;
        $[67] = t6;
        $[68] = t37;
    } else {
        t37 = $[68];
    }
    return t37;
}
_s(PdfViewer, "9lh4dhe9gsiuKHRxxQfPUR3vY8k=");
_c = PdfViewer;
function _PdfViewerHandleRotateSetRotate(prev_1) {
    return (prev_1 + 90) % 360;
}
function _PdfViewerHandleZoomOutSetScale(prev_0) {
    return Math.max(prev_0 - 0.2, 0.5);
}
function _PdfViewerHandleZoomInSetScale(prev) {
    return Math.min(prev + 0.2, 3);
}
var _c;
__turbopack_context__.k.register(_c, "PdfViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PdfViewer.js [client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/PdfViewer.js [client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_PdfViewer_26bf3177.js.map