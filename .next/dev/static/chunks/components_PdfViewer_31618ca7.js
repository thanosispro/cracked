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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [client] (ecmascript) <export default as RotateCw>");
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(85);
    if ($[0] !== "cec42af4ba3d13090b2ccc645c06f9ef1a01240aca96ce53061510773142d77c") {
        for(let $i = 0; $i < 85; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "cec42af4ba3d13090b2ccc645c06f9ef1a01240aca96ce53061510773142d77c";
    }
    const { fileUrl, fileName, onDownload, onClose, isFullScreen: t1 } = t0;
    const initialFullScreen = t1 === undefined ? true : t1;
    const [numPages, setNumPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pageNumber, setPageNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
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
    let t6;
    if ($[5] !== numPages) {
        t6 = ({
            "PdfViewer[nextPage]": ()=>setPageNumber({
                    "PdfViewer[nextPage > setPageNumber()]": (prev_2)=>Math.min(prev_2 + 1, numPages)
                }["PdfViewer[nextPage > setPageNumber()]"])
        })["PdfViewer[nextPage]"];
        $[5] = numPages;
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    const nextPage = t6;
    let t7;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "PdfViewer[prevPage]": ()=>setPageNumber(_PdfViewerPrevPageSetPageNumber)
        })["PdfViewer[prevPage]"];
        $[7] = t7;
    } else {
        t7 = $[7];
    }
    const prevPage = t7;
    const t8 = `flex flex-col h-full bg-[#0a0f1e] overflow-hidden ${isFullScreen ? "fixed inset-0 z-[60]" : "relative rounded-xl border border-white/10 shadow-2xl"}`;
    let t9;
    if ($[8] !== onClose) {
        t9 = onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClose,
            className: "p-2 hover:bg-white/5 rounded-lg transition-colors text-rose-400",
            title: "Go Back / Close",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 102,
                columnNumber: 147
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 102,
            columnNumber: 21
        }, this);
        $[8] = onClose;
        $[9] = t9;
    } else {
        t9 = $[9];
    }
    const t10 = fileName || "PDF Viewer";
    let t11;
    if ($[10] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-sm font-bold text-slate-200 truncate max-w-[200px]",
            children: t10
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 111,
            columnNumber: 11
        }, this);
        $[10] = t10;
        $[11] = t11;
    } else {
        t11 = $[11];
    }
    let t12;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[10px] text-slate-500 uppercase tracking-widest font-bold",
            children: "Document Preview"
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 119,
            columnNumber: 11
        }, this);
        $[12] = t12;
    } else {
        t12 = $[12];
    }
    let t13;
    if ($[13] !== t11) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden sm:block",
            children: [
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 126,
            columnNumber: 11
        }, this);
        $[13] = t11;
        $[14] = t13;
    } else {
        t13 = $[14];
    }
    let t14;
    if ($[15] !== t13 || $[16] !== t9) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: [
                t9,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 134,
            columnNumber: 11
        }, this);
        $[15] = t13;
        $[16] = t9;
        $[17] = t14;
    } else {
        t14 = $[17];
    }
    const t15 = pageNumber <= 1;
    let t16;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 144,
            columnNumber: 11
        }, this);
        $[18] = t16;
    } else {
        t16 = $[18];
    }
    let t17;
    if ($[19] !== t15) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: prevPage,
            disabled: t15,
            className: "p-1.5 hover:bg-white/5 disabled:opacity-30 rounded-lg text-indigo-400 transition-all",
            children: t16
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 151,
            columnNumber: 11
        }, this);
        $[19] = t15;
        $[20] = t17;
    } else {
        t17 = $[20];
    }
    const t18 = numPages || "--";
    let t19;
    if ($[21] !== pageNumber || $[22] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-mono text-slate-300 min-w-[60px] text-center",
            children: [
                pageNumber,
                " / ",
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 160,
            columnNumber: 11
        }, this);
        $[21] = pageNumber;
        $[22] = t18;
        $[23] = t19;
    } else {
        t19 = $[23];
    }
    const t20 = pageNumber >= numPages;
    let t21;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 170,
            columnNumber: 11
        }, this);
        $[24] = t21;
    } else {
        t21 = $[24];
    }
    let t22;
    if ($[25] !== nextPage || $[26] !== t20) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: nextPage,
            disabled: t20,
            className: "p-1.5 hover:bg-white/5 disabled:opacity-30 rounded-lg text-indigo-400 transition-all",
            children: t21
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[25] = nextPage;
        $[26] = t20;
        $[27] = t22;
    } else {
        t22 = $[27];
    }
    let t23;
    if ($[28] !== t17 || $[29] !== t19 || $[30] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center border-r border-white/10 pr-2 mr-2",
            children: [
                t17,
                t19,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 186,
            columnNumber: 11
        }, this);
        $[28] = t17;
        $[29] = t19;
        $[30] = t22;
        $[31] = t23;
    } else {
        t23 = $[31];
    }
    let t24;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleZoomOut,
            className: "p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 196,
                columnNumber: 136
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 196,
            columnNumber: 11
        }, this);
        $[32] = t24;
    } else {
        t24 = $[32];
    }
    let t25;
    if ($[33] !== scale) {
        t25 = Math.round(scale * 100);
        $[33] = scale;
        $[34] = t25;
    } else {
        t25 = $[34];
    }
    let t26;
    if ($[35] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-mono text-slate-300 w-12 text-center",
            children: [
                t25,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 211,
            columnNumber: 11
        }, this);
        $[35] = t25;
        $[36] = t26;
    } else {
        t26 = $[36];
    }
    let t27;
    if ($[37] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleZoomIn,
            className: "p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 219,
                columnNumber: 135
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 219,
            columnNumber: 11
        }, this);
        $[37] = t27;
    } else {
        t27 = $[37];
    }
    let t28;
    if ($[38] !== t26) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1",
            children: [
                t24,
                t26,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 226,
            columnNumber: 11
        }, this);
        $[38] = t26;
        $[39] = t28;
    } else {
        t28 = $[39];
    }
    let t29;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleRotate,
            className: "p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all hidden sm:block",
            title: "Rotate",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 234,
                columnNumber: 166
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 234,
            columnNumber: 11
        }, this);
        $[40] = t29;
    } else {
        t29 = $[40];
    }
    let t30;
    if ($[41] !== t23 || $[42] !== t28) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 sm:gap-4 bg-black/20 p-1 rounded-xl border border-white/5",
            children: [
                t23,
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 241,
            columnNumber: 11
        }, this);
        $[41] = t23;
        $[42] = t28;
        $[43] = t30;
    } else {
        t30 = $[43];
    }
    let t31;
    if ($[44] !== onDownload) {
        t31 = onDownload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onDownload,
            className: "p-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-all border border-indigo-500/20",
            title: "Download PDF",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 250,
                columnNumber: 215
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 250,
            columnNumber: 25
        }, this);
        $[44] = onDownload;
        $[45] = t31;
    } else {
        t31 = $[45];
    }
    let t32;
    if ($[46] !== isFullScreen) {
        t32 = ({
            "PdfViewer[<button>.onClick]": ()=>setIsFullScreen(!isFullScreen)
        })["PdfViewer[<button>.onClick]"];
        $[46] = isFullScreen;
        $[47] = t32;
    } else {
        t32 = $[47];
    }
    const t33 = isFullScreen ? "Minimize" : "Maximize";
    let t34;
    if ($[48] !== isFullScreen) {
        t34 = isFullScreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 269,
            columnNumber: 26
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 269,
            columnNumber: 52
        }, this);
        $[48] = isFullScreen;
        $[49] = t34;
    } else {
        t34 = $[49];
    }
    let t35;
    if ($[50] !== t32 || $[51] !== t33 || $[52] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t32,
            className: "p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white",
            title: t33,
            children: t34
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 277,
            columnNumber: 11
        }, this);
        $[50] = t32;
        $[51] = t33;
        $[52] = t34;
        $[53] = t35;
    } else {
        t35 = $[53];
    }
    let t36;
    if ($[54] !== isFullScreen || $[55] !== onClose) {
        t36 = onClose && isFullScreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClose,
            className: "p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all border border-rose-500/20",
            title: "Close",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 287,
                columnNumber: 210
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 287,
            columnNumber: 38
        }, this);
        $[54] = isFullScreen;
        $[55] = onClose;
        $[56] = t36;
    } else {
        t36 = $[56];
    }
    let t37;
    if ($[57] !== t31 || $[58] !== t35 || $[59] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t31,
                t35,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 296,
            columnNumber: 11
        }, this);
        $[57] = t31;
        $[58] = t35;
        $[59] = t36;
        $[60] = t37;
    } else {
        t37 = $[60];
    }
    let t38;
    if ($[61] !== t14 || $[62] !== t30 || $[63] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between p-3 bg-[#0f172a] border-b border-white/10 backdrop-blur-md z-10",
            children: [
                t14,
                t30,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 306,
            columnNumber: 11
        }, this);
        $[61] = t14;
        $[62] = t30;
        $[63] = t37;
        $[64] = t38;
    } else {
        t38 = $[64];
    }
    const t39 = fileUrl.endsWith("/") ? fileUrl : fileUrl + "/";
    let t40;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-[60vh] text-indigo-400 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                    className: "animate-spin",
                    size: 48
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 317,
                    columnNumber: 101
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-bold text-sm uppercase tracking-widest animate-pulse",
                    children: "Initializing Document..."
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 317,
                    columnNumber: 148
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 317,
            columnNumber: 11
        }, this);
        $[65] = t40;
    } else {
        t40 = $[65];
    }
    let t41;
    if ($[66] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-[60vh] text-rose-400 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 48
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 324,
                    columnNumber: 99
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-bold text-sm uppercase tracking-widest",
                    children: "Failed to load PDF"
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 324,
                    columnNumber: 114
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 324,
            columnNumber: 11
        }, this);
        $[66] = t41;
    } else {
        t41 = $[66];
    }
    let t42;
    if ($[67] !== pageNumber || $[68] !== rotate || $[69] !== scale) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__["Page"], {
            pageNumber: pageNumber,
            scale: scale,
            rotate: rotate,
            renderTextLayer: true,
            renderAnnotationLayer: true,
            className: "shadow-2xl border border-white/5"
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 331,
            columnNumber: 11
        }, this);
        $[67] = pageNumber;
        $[68] = rotate;
        $[69] = scale;
        $[70] = t42;
    } else {
        t42 = $[70];
    }
    let t43;
    if ($[71] !== t39 || $[72] !== t42) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-auto bg-[#020617] scrollbar-hide flex justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pdf-container shadow-2xl origin-top transition-transform duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__["Document"], {
                    file: t39,
                    onLoadSuccess: onDocumentLoadSuccess,
                    loading: t40,
                    error: t41,
                    children: t42
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.js",
                    lineNumber: 341,
                    columnNumber: 188
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 341,
                columnNumber: 101
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 341,
            columnNumber: 11
        }, this);
        $[71] = t39;
        $[72] = t42;
        $[73] = t43;
    } else {
        t43 = $[73];
    }
    let t44;
    if ($[74] !== numPages) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[10px] text-slate-500 font-medium",
            children: [
                numPages,
                " Pages Detected"
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 350,
            columnNumber: 11
        }, this);
        $[74] = numPages;
        $[75] = t44;
    } else {
        t44 = $[75];
    }
    let t45;
    if ($[76] === Symbol.for("react.memo_cache_sentinel")) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] text-slate-500 font-medium flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/components/PdfViewer.js",
                        lineNumber: 358,
                        columnNumber: 119
                    }, this),
                    "Secure Viewer"
                ]
            }, void 0, true, {
                fileName: "[project]/components/PdfViewer.js",
                lineNumber: 358,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[76] = t45;
    } else {
        t45 = $[76];
    }
    let t46;
    if ($[77] !== t44) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-2 bg-[#0f172a] border-t border-white/10 flex justify-between items-center",
            children: [
                t44,
                t45
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 365,
            columnNumber: 11
        }, this);
        $[77] = t44;
        $[78] = t46;
    } else {
        t46 = $[78];
    }
    let t47;
    if ($[79] === Symbol.for("react.memo_cache_sentinel")) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            id: "d0ac663f406c51ed",
            children: ".pdf-container .react-pdf__Page{margin-bottom:0!important}.pdf-container canvas{max-width:100%;height:auto!important}.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}"
        }, void 0, false, void 0, this);
        $[79] = t47;
    } else {
        t47 = $[79];
    }
    let t48;
    if ($[80] !== t38 || $[81] !== t43 || $[82] !== t46 || $[83] !== t8) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t8,
            children: [
                t38,
                t43,
                t46,
                t47
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.js",
            lineNumber: 380,
            columnNumber: 11
        }, this);
        $[80] = t38;
        $[81] = t43;
        $[82] = t46;
        $[83] = t8;
        $[84] = t48;
    } else {
        t48 = $[84];
    }
    return t48;
}
_s(PdfViewer, "wUcRqrNMMX5Tnf340VvVCE0Ltio=");
_c = PdfViewer;
function _PdfViewerPrevPageSetPageNumber(prev_3) {
    return Math.max(prev_3 - 1, 1);
}
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
]);

//# sourceMappingURL=components_PdfViewer_31618ca7.js.map