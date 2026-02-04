(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/components/quiz/quizEngine.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/compiler-runtime.js [client] (ecmascript)");
// components/QuizEngine.js
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [client] (ecmascript) <export default as AlertTriangle>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function QuizEngine(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(52);
    if ($[0] !== "00c6834420b13123c0ad3fa0d44056bbd0b150f692ebbdeaeb37283cd4c2ba24") {
        for(let $i = 0; $i < 52; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "00c6834420b13123c0ad3fa0d44056bbd0b150f692ebbdeaeb37283cd4c2ba24";
    }
    const { questions, onFinish, onExit } = t0;
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [userAnswers, setUserAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [showReason, setShowReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmExit, setConfirmExit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentQ = questions[currentIndex];
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = [];
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(_QuizEngineUseEffect, t2);
    let t3;
    if ($[3] !== currentIndex || $[4] !== currentQ.answer || $[5] !== currentQ.id || $[6] !== onFinish || $[7] !== questions.length || $[8] !== selected || $[9] !== userAnswers) {
        t3 = ({
            "QuizEngine[handleSelect]": (option)=>{
                if (selected) {
                    return;
                }
                setSelected(option);
                setShowReason(true);
                const isCorrect = option === currentQ.answer;
                const updatedAnswers = [
                    ...userAnswers,
                    {
                        questionId: currentQ.id,
                        choice: option,
                        isCorrect
                    }
                ];
                setTimeout({
                    "QuizEngine[handleSelect > setTimeout()]": ()=>{
                        if (currentIndex < questions.length - 1) {
                            setCurrentIndex(_QuizEngineHandleSelectSetTimeoutSetCurrentIndex);
                            setSelected(null);
                            setShowReason(false);
                            setUserAnswers(updatedAnswers);
                        } else {
                            onFinish(updatedAnswers);
                        }
                    }
                }["QuizEngine[handleSelect > setTimeout()]"], 2000);
            }
        })["QuizEngine[handleSelect]"];
        $[3] = currentIndex;
        $[4] = currentQ.answer;
        $[5] = currentQ.id;
        $[6] = onFinish;
        $[7] = questions.length;
        $[8] = selected;
        $[9] = userAnswers;
        $[10] = t3;
    } else {
        t3 = $[10];
    }
    const handleSelect = t3;
    let t4;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "QuizEngine[<button>.onClick]": ()=>setConfirmExit(true)
        })["QuizEngine[<button>.onClick]"];
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    let t5;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t4,
            className: "flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/quizEngine.js",
                    lineNumber: 91,
                    columnNumber: 137
                }, this),
                "Quit Session"
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    let t6;
    if ($[13] !== userAnswers) {
        t6 = userAnswers.length > 0 ? Math.round(userAnswers.filter(_QuizEngineUserAnswersFilter).length / userAnswers.length * 100) : 0;
        $[13] = userAnswers;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between items-center mb-6",
            children: [
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-right",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-mono text-slate-500 uppercase tracking-widest font-bold",
                        children: [
                            "Accuracy: ",
                            t6,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/quiz/quizEngine.js",
                        lineNumber: 106,
                        columnNumber: 98
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/quiz/quizEngine.js",
                    lineNumber: 106,
                    columnNumber: 70
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 106,
            columnNumber: 10
        }, this);
        $[15] = t6;
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    const t8 = `${(currentIndex + 1) / questions.length * 100}%`;
    let t9;
    if ($[17] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-2 bg-white/5 rounded-full mb-8 overflow-hidden",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300",
                style: {
                    width: t8
                }
            }, void 0, false, {
                fileName: "[project]/components/quiz/quizEngine.js",
                lineNumber: 115,
                columnNumber: 83
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 115,
            columnNumber: 10
        }, this);
        $[17] = t8;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== confirmExit || $[20] !== onExit) {
        t10 = confirmExit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-3xl p-6 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 max-w-sm bg-[#0a0f1e] p-8 rounded-2xl shadow-2xl border border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        className: "w-12 h-12 text-amber-500 mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/components/quiz/quizEngine.js",
                        lineNumber: 125,
                        columnNumber: 254
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-white",
                        children: "Abandon Progress?"
                    }, void 0, false, {
                        fileName: "[project]/components/quiz/quizEngine.js",
                        lineNumber: 125,
                        columnNumber: 316
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400 text-sm",
                        children: "Your answers for this session will not be saved."
                    }, void 0, false, {
                        fileName: "[project]/components/quiz/quizEngine.js",
                        lineNumber: 125,
                        columnNumber: 383
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 justify-center pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: {
                                    "QuizEngine[<button>.onClick]": ()=>setConfirmExit(false)
                                }["QuizEngine[<button>.onClick]"],
                                className: "px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-white transition-all",
                                children: "Stay"
                            }, void 0, false, {
                                fileName: "[project]/components/quiz/quizEngine.js",
                                lineNumber: 125,
                                columnNumber: 521
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onExit,
                                className: "px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-bold transition-all border border-red-500/20",
                                children: "Exit Quiz"
                            }, void 0, false, {
                                fileName: "[project]/components/quiz/quizEngine.js",
                                lineNumber: 127,
                                columnNumber: 166
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/quiz/quizEngine.js",
                        lineNumber: 125,
                        columnNumber: 473
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/quiz/quizEngine.js",
                lineNumber: 125,
                columnNumber: 155
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 125,
            columnNumber: 26
        }, this);
        $[19] = confirmExit;
        $[20] = onExit;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    const t11 = currentIndex + 1;
    let t12;
    if ($[22] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[11px] font-extrabold text-indigo-400 uppercase tracking-[0.2em] bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20",
            children: [
                "Step ",
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[22] = t11;
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    let t13;
    if ($[24] !== currentQ.question) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl md:text-3xl font-bold mt-6 mb-8 leading-relaxed text-slate-200",
            children: currentQ.question
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 145,
            columnNumber: 11
        }, this);
        $[24] = currentQ.question;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== confirmExit || $[27] !== currentQ.answer || $[28] !== currentQ.options || $[29] !== handleSelect || $[30] !== selected) {
        let t15;
        if ($[32] !== confirmExit || $[33] !== currentQ.answer || $[34] !== handleSelect || $[35] !== selected) {
            t15 = ({
                "QuizEngine[currentQ.options.map()]": (opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: !!selected || confirmExit,
                        onClick: {
                            "QuizEngine[currentQ.options.map() > <button>.onClick]": ()=>handleSelect(opt)
                        }["QuizEngine[currentQ.options.map() > <button>.onClick]"],
                        className: `p-6 rounded-2xl text-left border-2 transition-all duration-200 font-medium ${selected === opt ? opt === currentQ.answer ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-rose-500/50 bg-rose-500/10 text-rose-400" : selected && opt === currentQ.answer ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-slate-400 hover:text-slate-200"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: opt
                                }, void 0, false, {
                                    fileName: "[project]/components/quiz/quizEngine.js",
                                    lineNumber: 158,
                                    columnNumber: 582
                                }, this),
                                selected === opt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold uppercase tracking-wider",
                                    children: opt === currentQ.answer ? "Correct" : "Incorrect"
                                }, void 0, false, {
                                    fileName: "[project]/components/quiz/quizEngine.js",
                                    lineNumber: 158,
                                    columnNumber: 621
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/quiz/quizEngine.js",
                            lineNumber: 158,
                            columnNumber: 531
                        }, this)
                    }, opt, false, {
                        fileName: "[project]/components/quiz/quizEngine.js",
                        lineNumber: 156,
                        columnNumber: 54
                    }, this)
            })["QuizEngine[currentQ.options.map()]"];
            $[32] = confirmExit;
            $[33] = currentQ.answer;
            $[34] = handleSelect;
            $[35] = selected;
            $[36] = t15;
        } else {
            t15 = $[36];
        }
        t14 = currentQ.options.map(t15);
        $[26] = confirmExit;
        $[27] = currentQ.answer;
        $[28] = currentQ.options;
        $[29] = handleSelect;
        $[30] = selected;
        $[31] = t14;
    } else {
        t14 = $[31];
    }
    let t15;
    if ($[37] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-4",
            children: t14
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 180,
            columnNumber: 11
        }, this);
        $[37] = t14;
        $[38] = t15;
    } else {
        t15 = $[38];
    }
    let t16;
    if ($[39] !== currentQ.reason || $[40] !== showReason) {
        t16 = showReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 p-6 bg-white/[0.02] rounded-2xl border border-white/5 animate-in fade-in slide-in-from-top-2 duration-300",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm leading-relaxed text-slate-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-indigo-400 font-bold block mb-1",
                        children: "Explanation:"
                    }, void 0, false, {
                        fileName: "[project]/components/quiz/quizEngine.js",
                        lineNumber: 188,
                        columnNumber: 207
                    }, this),
                    " ",
                    currentQ.reason
                ]
            }, void 0, true, {
                fileName: "[project]/components/quiz/quizEngine.js",
                lineNumber: 188,
                columnNumber: 153
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 188,
            columnNumber: 25
        }, this);
        $[39] = currentQ.reason;
        $[40] = showReason;
        $[41] = t16;
    } else {
        t16 = $[41];
    }
    let t17;
    if ($[42] !== t12 || $[43] !== t13 || $[44] !== t15 || $[45] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0a0f1e] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl",
            children: [
                t12,
                t13,
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 197,
            columnNumber: 11
        }, this);
        $[42] = t12;
        $[43] = t13;
        $[44] = t15;
        $[45] = t16;
        $[46] = t17;
    } else {
        t17 = $[46];
    }
    let t18;
    if ($[47] !== t10 || $[48] !== t17 || $[49] !== t7 || $[50] !== t9) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full relative",
            children: [
                t7,
                t9,
                t10,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/quizEngine.js",
            lineNumber: 208,
            columnNumber: 11
        }, this);
        $[47] = t10;
        $[48] = t17;
        $[49] = t7;
        $[50] = t9;
        $[51] = t18;
    } else {
        t18 = $[51];
    }
    return t18;
}
_s(QuizEngine, "DleVqsUIGn4n7pdZwGRxRENdqO8=");
_c = QuizEngine;
function _QuizEngineUserAnswersFilter(a) {
    return a.isCorrect;
}
function _QuizEngineHandleSelectSetTimeoutSetCurrentIndex(prev) {
    return prev + 1;
}
function _QuizEngineUseEffect() {
    window.scrollTo(0, 0);
}
var _c;
__turbopack_context__.k.register(_c, "QuizEngine");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/quiz/lobby.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizLobby
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/compiler-runtime.js [client] (ecmascript)");
// components/QuizLobby.js
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [client] (ecmascript) <export default as Info>");
;
;
;
function QuizLobby(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(32);
    if ($[0] !== "29a49c3a7e4e031eee95d265f66f254c83b42501e1dd207ff4e3a0eb911e04a8") {
        for(let $i = 0; $i < 32; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "29a49c3a7e4e031eee95d265f66f254c83b42501e1dd207ff4e3a0eb911e04a8";
    }
    const { onStart } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                    className: "w-3 h-3"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 17,
                    columnNumber: 185
                }, this),
                "Challenge Status: Active"
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 17,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center space-y-4",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-5xl font-bold text-white tracking-tight",
                    children: [
                        "Ready for a ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400",
                            children: "Knowledge Drill?"
                        }, void 0, false, {
                            fileName: "[project]/components/quiz/lobby.js",
                            lineNumber: 24,
                            columnNumber: 126
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 24,
                    columnNumber: 53
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400 max-w-lg mx-auto leading-relaxed text-lg",
                    children: "Sharpen your skills with our curated question database. Track your accuracy, review your mistakes, and dominate the leaderboard."
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 24,
                    columnNumber: 247
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 24,
            columnNumber: 10
        }, this);
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 bg-[#0a0f1e] border border-white/5 rounded-2xl text-center hover:border-indigo-500/30 transition-colors",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                    className: "w-5 h-5 text-slate-500 mx-auto mb-2"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 31,
                    columnNumber: 135
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold text-white",
                    children: "85%"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 31,
                    columnNumber: 193
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] text-slate-500 uppercase tracking-widest font-semibold",
                    children: "Avg. Accuracy"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 31,
                    columnNumber: 245
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 31,
            columnNumber: 10
        }, this);
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 bg-[#0a0f1e] border border-white/5 rounded-2xl text-center hover:border-indigo-500/30 transition-colors",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "w-5 h-5 text-slate-500 mx-auto mb-2"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 38,
                    columnNumber: 135
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold text-white",
                    children: "1.2k"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 38,
                    columnNumber: 192
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] text-slate-500 uppercase tracking-widest font-semibold",
                    children: "Minutes Practiced"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 38,
                    columnNumber: 245
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 38,
            columnNumber: 10
        }, this);
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl",
            children: [
                t3,
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 bg-[#0a0f1e] border border-white/5 rounded-2xl text-center hidden md:block hover:border-indigo-500/30 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                            className: "w-5 h-5 text-slate-500 mx-auto mb-2"
                        }, void 0, false, {
                            fileName: "[project]/components/quiz/lobby.js",
                            lineNumber: 45,
                            columnNumber: 231
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-2xl font-bold text-white",
                            children: "50+"
                        }, void 0, false, {
                            fileName: "[project]/components/quiz/lobby.js",
                            lineNumber: 45,
                            columnNumber: 289
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] text-slate-500 uppercase tracking-widest font-semibold",
                            children: "Sets Available"
                        }, void 0, false, {
                            fileName: "[project]/components/quiz/lobby.js",
                            lineNumber: 45,
                            columnNumber: 341
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 45,
                    columnNumber: 90
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] !== onStart) {
        t6 = ({
            "QuizLobby[<button>.onClick]": ()=>onStart("random", 10)
        })["QuizLobby[<button>.onClick]"];
        $[6] = onStart;
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                className: "w-32 h-32 text-indigo-500"
            }, void 0, false, {
                fileName: "[project]/components/quiz/lobby.js",
                lineNumber: 62,
                columnNumber: 106
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t10;
    let t8;
    let t9;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/components/quiz/lobby.js",
                lineNumber: 71,
                columnNumber: 147
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-2xl font-bold text-white",
            children: "Quick Mix"
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-slate-400 text-sm mt-3 leading-relaxed",
            children: "Jump straight into action with 10 random questions from all topics. Best for daily practice."
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 73,
            columnNumber: 11
        }, this);
        $[9] = t10;
        $[10] = t8;
        $[11] = t9;
    } else {
        t10 = $[9];
        t8 = $[10];
        t9 = $[11];
    }
    let t11;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest",
            children: [
                "Start Drill ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "group-hover:translate-x-1 transition-transform",
                    children: "→"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 84,
                    columnNumber: 129
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 84,
            columnNumber: 11
        }, this);
        $[12] = t11;
    } else {
        t11 = $[12];
    }
    let t12;
    if ($[13] !== t6) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t6,
            className: "relative w-full p-8 bg-[#0a0f1e] border border-white/5 rounded-3xl overflow-hidden group text-left hover:bg-[#111827] hover:border-indigo-500/30 transition-all duration-200",
            children: [
                t7,
                t8,
                t9,
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 91,
            columnNumber: 11
        }, this);
        $[13] = t6;
        $[14] = t12;
    } else {
        t12 = $[14];
    }
    let t13;
    if ($[15] !== onStart) {
        t13 = ({
            "QuizLobby[<button>.onClick]": ()=>onStart("set")
        })["QuizLobby[<button>.onClick]"];
        $[15] = onStart;
        $[16] = t13;
    } else {
        t13 = $[16];
    }
    let t14;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                className: "w-32 h-32 text-cyan-500"
            }, void 0, false, {
                fileName: "[project]/components/quiz/lobby.js",
                lineNumber: 109,
                columnNumber: 107
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 109,
            columnNumber: 11
        }, this);
        $[17] = t14;
    } else {
        t14 = $[17];
    }
    let t15;
    let t16;
    let t17;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/components/quiz/lobby.js",
                lineNumber: 118,
                columnNumber: 142
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 118,
            columnNumber: 11
        }, this);
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-2xl font-bold text-white",
            children: "Mystery Set"
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 119,
            columnNumber: 11
        }, this);
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-slate-400 text-sm mt-3 leading-relaxed",
            children: "Take on a hand-crafted set of 10 themed questions. Perfect for mastering specific chapters."
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 120,
            columnNumber: 11
        }, this);
        $[18] = t15;
        $[19] = t16;
        $[20] = t17;
    } else {
        t15 = $[18];
        t16 = $[19];
        t17 = $[20];
    }
    let t18;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest",
            children: [
                "Do Set ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "group-hover:translate-x-1 transition-transform",
                    children: "→"
                }, void 0, false, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 131,
                    columnNumber: 122
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 131,
            columnNumber: 11
        }, this);
        $[21] = t18;
    } else {
        t18 = $[21];
    }
    let t19;
    if ($[22] !== t13) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t13,
            className: "relative w-full p-8 bg-[#0a0f1e] border border-white/5 rounded-3xl overflow-hidden group text-left hover:bg-[#111827] hover:border-cyan-500/30 transition-all duration-200",
            children: [
                t14,
                t15,
                t16,
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 138,
            columnNumber: 11
        }, this);
        $[22] = t13;
        $[23] = t19;
    } else {
        t19 = $[23];
    }
    let t20;
    if ($[24] !== t12 || $[25] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl",
            children: [
                t12,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 146,
            columnNumber: 11
        }, this);
        $[24] = t12;
        $[25] = t19;
        $[26] = t20;
    } else {
        t20 = $[26];
    }
    let t21;
    let t22;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-2 bg-yellow-500/10 rounded-lg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                className: "w-4 h-4 text-yellow-500"
            }, void 0, false, {
                fileName: "[project]/components/quiz/lobby.js",
                lineNumber: 156,
                columnNumber: 60
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 156,
            columnNumber: 11
        }, this);
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-bold text-slate-300 uppercase tracking-wider",
            children: "Pro Tip"
        }, void 0, false, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[27] = t21;
        $[28] = t22;
    } else {
        t21 = $[27];
        t22 = $[28];
    }
    let t23;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-2xl p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-4",
            children: [
                t21,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t22,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-500 mt-1",
                            children: [
                                "Always read the ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-400 font-semibold italic",
                                    children: "reasoning"
                                }, void 0, false, {
                                    fileName: "[project]/components/quiz/lobby.js",
                                    lineNumber: 166,
                                    columnNumber: 196
                                }, this),
                                " after answering, even if you got it right. It helps cement the logic in your long-term memory."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/quiz/lobby.js",
                            lineNumber: 166,
                            columnNumber: 137
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/quiz/lobby.js",
                    lineNumber: 166,
                    columnNumber: 127
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 166,
            columnNumber: 11
        }, this);
        $[29] = t23;
    } else {
        t23 = $[29];
    }
    let t24;
    if ($[30] !== t20) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center space-y-12",
            children: [
                t2,
                t5,
                t20,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/lobby.js",
            lineNumber: 173,
            columnNumber: 11
        }, this);
        $[30] = t20;
        $[31] = t24;
    } else {
        t24 = $[31];
    }
    return t24;
}
_c = QuizLobby;
var _c;
__turbopack_context__.k.register(_c, "QuizLobby");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/quiz/quizPreview.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/compiler-runtime.js [client] (ecmascript)");
;
;
function QuizPreview(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(31);
    if ($[0] !== "2b3065572021454a620f5f105ab2592ca57ad2a90b819257b5ef675f7fa4f052") {
        for(let $i = 0; $i < 31; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2b3065572021454a620f5f105ab2592ca57ad2a90b819257b5ef675f7fa4f052";
    }
    const { questions, results, onReset, onNextSet } = t0;
    let t1;
    if ($[1] !== results) {
        t1 = results.filter(_QuizPreviewResultsFilter);
        $[1] = results;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const score = t1.length;
    let t2;
    if ($[3] !== questions.length || $[4] !== score) {
        t2 = Math.round(score / questions.length * 100);
        $[3] = questions.length;
        $[4] = score;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const accuracy = t2;
    let t3;
    if ($[6] !== accuracy) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-block p-4 rounded-full bg-white/5 mb-4 border border-white/5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400",
                children: [
                    accuracy,
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/components/quiz/quizPreview.js",
                lineNumber: 39,
                columnNumber: 95
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 39,
            columnNumber: 10
        }, this);
        $[6] = accuracy;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-bold text-white",
            children: "Performance Report"
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 48,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-slate-500 mt-2",
            children: "Set Completed! Excellent progress."
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 49,
            columnNumber: 10
        }, this);
        $[8] = t4;
        $[9] = t5;
    } else {
        t4 = $[8];
        t5 = $[9];
    }
    let t6;
    if ($[10] !== onNextSet) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onNextSet,
            className: "px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20",
            children: "Generate Next Set"
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 58,
            columnNumber: 10
        }, this);
        $[10] = onNextSet;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== onReset) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onReset,
            className: "px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl font-bold transition-all border border-white/5",
            children: "Back to Lobby"
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        $[12] = onReset;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== t6 || $[15] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col md:flex-row gap-4 justify-center mt-10",
            children: [
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[14] = t6;
        $[15] = t7;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== t3 || $[18] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center p-12 bg-[#0a0f1e] rounded-[2.5rem] border border-white/5 shadow-2xl",
            children: [
                t3,
                t4,
                t5,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 83,
            columnNumber: 10
        }, this);
        $[17] = t3;
        $[18] = t8;
        $[19] = t9;
    } else {
        t9 = $[19];
    }
    let t10;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-xl font-bold px-4 text-white",
            children: "Review Answers"
        }, void 0, false, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 92,
            columnNumber: 11
        }, this);
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    let t11;
    if ($[21] !== questions || $[22] !== results) {
        let t12;
        if ($[24] !== results) {
            t12 = ({
                "QuizPreview[questions.map()]": (q, idx)=>{
                    const userAns = results.find({
                        "QuizPreview[questions.map() > results.find()]": (r_0)=>r_0.questionId === q.id
                    }["QuizPreview[questions.map() > results.find()]"]);
                    const isCorrect = userAns?.isCorrect;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-6 rounded-2xl border transition-all duration-300 ${isCorrect ? "border-emerald-500/20 bg-emerald-500/5" : "border-rose-500/20 bg-rose-500/5"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-bold text-slate-200 text-lg mb-3",
                                children: q.question
                            }, void 0, false, {
                                fileName: "[project]/components/quiz/quizPreview.js",
                                lineNumber: 107,
                                columnNumber: 191
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold",
                                                children: [
                                                    "Your Answer: ",
                                                    userAns?.choice
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/quiz/quizPreview.js",
                                                lineNumber: 107,
                                                columnNumber: 336
                                            }, this),
                                            !isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded text-xs font-bold uppercase border border-rose-500/20",
                                                children: "Incorrect"
                                            }, void 0, false, {
                                                fileName: "[project]/components/quiz/quizPreview.js",
                                                lineNumber: 107,
                                                columnNumber: 475
                                            }, this),
                                            isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-xs font-bold uppercase border border-emerald-500/20",
                                                children: "Correct"
                                            }, void 0, false, {
                                                fileName: "[project]/components/quiz/quizPreview.js",
                                                lineNumber: 107,
                                                columnNumber: 627
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/quiz/quizPreview.js",
                                        lineNumber: 107,
                                        columnNumber: 295
                                    }, this),
                                    !isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-emerald-400 font-bold",
                                        children: [
                                            "Correct: ",
                                            q.answer
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/quiz/quizPreview.js",
                                        lineNumber: 107,
                                        columnNumber: 793
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 pt-3 border-t border-white/5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-500 text-xs leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-slate-400",
                                                    children: "Note:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/quiz/quizPreview.js",
                                                    lineNumber: 107,
                                                    columnNumber: 964
                                                }, this),
                                                " ",
                                                q.reason
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/quiz/quizPreview.js",
                                            lineNumber: 107,
                                            columnNumber: 910
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/quiz/quizPreview.js",
                                        lineNumber: 107,
                                        columnNumber: 859
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/quiz/quizPreview.js",
                                lineNumber: 107,
                                columnNumber: 260
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/components/quiz/quizPreview.js",
                        lineNumber: 107,
                        columnNumber: 18
                    }, this);
                }
            })["QuizPreview[questions.map()]"];
            $[24] = results;
            $[25] = t12;
        } else {
            t12 = $[25];
        }
        t11 = questions.map(t12);
        $[21] = questions;
        $[22] = results;
        $[23] = t11;
    } else {
        t11 = $[23];
    }
    let t12;
    if ($[26] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[26] = t11;
        $[27] = t12;
    } else {
        t12 = $[27];
    }
    let t13;
    if ($[28] !== t12 || $[29] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t9,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/components/quiz/quizPreview.js",
            lineNumber: 132,
            columnNumber: 11
        }, this);
        $[28] = t12;
        $[29] = t9;
        $[30] = t13;
    } else {
        t13 = $[30];
    }
    return t13;
}
_c = QuizPreview;
function _QuizPreviewResultsFilter(r) {
    return r.isCorrect;
}
var _c;
__turbopack_context__.k.register(_c, "QuizPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/quiz.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$quiz$2f$quizEngine$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/quiz/quizEngine.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$quiz$2f$lobby$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/quiz/lobby.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$quiz$2f$quizPreview$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/quiz/quizPreview.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function QuizPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "5d683ee21344393302963d491121e41698cb1659d83ca84b4a8ca26c8dd7fec6") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5d683ee21344393302963d491121e41698cb1659d83ca84b4a8ca26c8dd7fec6";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(_QuizPageUseEffect, t0);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("lobby");
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [currentSetId, setCurrentSetId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = [];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(t2);
    const getCompletedSets = _QuizPageGetCompletedSets;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "QuizPage[startQuiz]": async (mode)=>{
                const excluded = getCompletedSets();
                ;
                try {
                    const res = await fetch(`${("TURBOPACK compile-time value", "http://192.168.18.12:8000")}/api/quiz/?mode=${mode}&exclude=${excluded}`);
                    const data = await res.json();
                    setQuestions(data.questions);
                    setCurrentSetId(data.set_number);
                    setView("playing");
                } catch (t4) {
                    const err = t4;
                    console.error("Fetch error", err);
                }
            }
        })["QuizPage[startQuiz]"];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const startQuiz = t3;
    let t4;
    if ($[5] !== currentSetId) {
        t4 = ({
            "QuizPage[finishQuiz]": (userAnswers)=>{
                setResults(userAnswers);
                if (currentSetId) {
                    const existing = getCompletedSets();
                    const updated = existing ? `${existing},${currentSetId}` : `${currentSetId}`;
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"].set("completed_sets", updated, {
                        expires: 7
                    });
                }
                setView("preview");
            }
        })["QuizPage[finishQuiz]"];
        $[5] = currentSetId;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    const finishQuiz = t4;
    let t5;
    if ($[7] !== view) {
        t5 = view === "lobby" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$quiz$2f$lobby$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            onStart: startQuiz
        }, void 0, false, {
            fileName: "[project]/pages/quiz.js",
            lineNumber: 91,
            columnNumber: 30
        }, this);
        $[7] = view;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== finishQuiz || $[10] !== questions || $[11] !== view) {
        t6 = view === "playing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$quiz$2f$quizEngine$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            questions: questions,
            onFinish: finishQuiz,
            onExit: {
                "QuizPage[<QuizEngine>.onExit]": ()=>setView("lobby")
            }["QuizPage[<QuizEngine>.onExit]"]
        }, void 0, false, {
            fileName: "[project]/pages/quiz.js",
            lineNumber: 99,
            columnNumber: 32
        }, this);
        $[9] = finishQuiz;
        $[10] = questions;
        $[11] = view;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== questions || $[14] !== results || $[15] !== view) {
        t7 = view === "preview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$quiz$2f$quizPreview$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            questions: questions,
            results: results,
            onReset: {
                "QuizPage[<QuizPreview>.onReset]": ()=>setView("lobby")
            }["QuizPage[<QuizPreview>.onReset]"],
            onNextSet: {
                "QuizPage[<QuizPreview>.onNextSet]": ()=>startQuiz("set")
            }["QuizPage[<QuizPreview>.onNextSet]"]
        }, void 0, false, {
            fileName: "[project]/pages/quiz.js",
            lineNumber: 111,
            columnNumber: 32
        }, this);
        $[13] = questions;
        $[14] = results;
        $[15] = view;
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    let t8;
    if ($[17] !== t5 || $[18] !== t6 || $[19] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-[#020617] text-slate-300 pt-32 pb-20 flex flex-col items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl px-4",
                children: [
                    t5,
                    t6,
                    t7
                ]
            }, void 0, true, {
                fileName: "[project]/pages/quiz.js",
                lineNumber: 125,
                columnNumber: 108
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/quiz.js",
            lineNumber: 125,
            columnNumber: 10
        }, this);
        $[17] = t5;
        $[18] = t6;
        $[19] = t7;
        $[20] = t8;
    } else {
        t8 = $[20];
    }
    return t8;
}
_s(QuizPage, "h/2ZWakNpv0KgsoTxZHy+69/StI=");
_c = QuizPage;
function _QuizPageGetCompletedSets() {
    const saved = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"].get("completed_sets");
    return saved ? saved : "";
}
function _QuizPageUseEffect() {
    document.title = "Quizzes | Crackfor";
}
var _c;
__turbopack_context__.k.register(_c, "QuizPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/quiz.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/quiz";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/quiz.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/quiz\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/quiz.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__711261f8._.js.map