import { useState, useRef, useEffect } from "react";
import { Client } from "@gradio/client";
import { Send, X, Loader2, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! 👋 I'm your **AI Assistant**. \n\nHow can I help you today? I can assist with:\n- Finding study notes\n- Solving physics problems\n- Navigating the website",
            sender: "bot",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: inputValue.trim(),
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const client = await Client.connect("Crackedus/Chatbot_cracked");
            const result = await client.predict("/chat_response", {
                message: userMessage.text,
            });

            const botResponseText = result.data[0];

            const botMessage = {
                id: Date.now() + 1,
                text: botResponseText,
                sender: "bot",
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("ChatBot Error:", error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "Sorry, something went wrong. Please try again later.",
                sender: "bot",
                isError: true,
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        // Responsive styles: Full screen on mobile, fixed size on desktop
                        className="fixed z-50 overflow-hidden flex flex-col bg-slate-900 border-slate-700/50 shadow-2xl
                                    inset-0 top-[safe-area-inset-top] w-full h-full rounded-none
                                    md:inset-auto md:bottom-24 md:right-6 md:w-[600px] md:h-[800px] md:max-h-[85vh] md:rounded-2xl md:border"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/20 rounded-lg shadow-inner shadow-indigo-500/10">
                                    <Sparkles className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-100 text-lg">AI Assistant</h3>
                                    <p className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                                        Online & Ready
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-4 max-w-[90%]",
                                        message.sender === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
                                            message.sender === "user"
                                                ? "bg-indigo-600 shadow-indigo-500/20"
                                                : "bg-slate-800 border border-slate-700"
                                        )}
                                    >
                                        {message.sender === "user" ? (
                                            <User className="w-5 h-5 text-white" />
                                        ) : (
                                            <Sparkles className="w-5 h-5 text-indigo-400" />
                                        )}
                                    </div>
                                    <div
                                        className={cn(
                                            "p-4 rounded-2xl text-base leading-relaxed shadow-sm min-w-0 break-words", // min-w-0 for markdown overflow fix
                                            message.sender === "user"
                                                ? "bg-indigo-600 text-white rounded-tr-sm"
                                                : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm",
                                            message.isError && "bg-red-900/50 border-red-800 text-red-200"
                                        )}
                                    >
                                        {message.sender === "user" ? (
                                            message.text
                                        ) : (
                                            <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-2 prose-li:my-0.5">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        a: ({ node, ...props }) => <a {...props} className="text-indigo-300 hover:text-indigo-200 underline break-all" target="_blank" rel="noopener noreferrer" />,
                                                        ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 space-y-1" />,
                                                        ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-4 space-y-1" />,
                                                        li: ({ node, ...props }) => <li {...props} className="marker:text-indigo-400/50" />,
                                                        code: ({ node, inline, className, children, ...props }) => {
                                                            return inline ? (
                                                                <code className="bg-black/30 px-1 py-0.5 rounded text-indigo-200 font-mono text-sm" {...props}>
                                                                    {children}
                                                                </code>
                                                            ) : (
                                                                <code className="block bg-black/30 p-2 rounded text-indigo-200 font-mono text-sm overflow-x-auto" {...props}>
                                                                    {children}
                                                                </code>
                                                            )
                                                        }
                                                    }}
                                                >
                                                    {message.text}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-4 max-w-[90%]">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 bg-slate-800/50 border-t border-slate-700 backdrop-blur-sm"
                        >
                            <div className="relative flex items-center gap-3">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-base rounded-xl py-3.5 pl-5 pr-14 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-500 transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5 ml-0.5" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-8 right-8 z-50 p-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl shadow-indigo-500/40 transition-all border-2 border-indigo-400/30",
                    isOpen ? "hidden md:flex" : "flex"
                )}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-indigo-400 blur-xl opacity-30 animate-pulse"></div>
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <X className="w-7 h-7" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <Sparkles className="w-7 h-7" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
}
