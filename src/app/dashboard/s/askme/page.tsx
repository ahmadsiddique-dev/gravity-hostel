"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, TextUIPart } from "ai";
import { ThinkingLoader } from "@/components/chat/Loader";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { getId } from "@/hooks/get-id";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [model, setModel] = useState<
    "gemini-2.5-flash" | "gemini-2.5-flash-lite" | "gemini-3-flash-preview"
  >("gemini-2.5-flash");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/s/chat",
    }),
  });

  const isTyping = status === "submitted" || status === "streaming";
  const hasError = status === "error";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, error]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const prompt = input + " id: " + getId();

    const userMessage = prompt;
    setInput("");

    try {
      await sendMessage(
        { text: userMessage },
        {
          body: {
            model: model,
          },
        },
      );
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const copyToClipboard = (parts: any[], id: string) => {
    const textToCopy = parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-[86vh] max-w-3xl mx-auto p-4 md:p-6 overflow-hidden relative">
      {messages.length === 0 && !isTyping && (
        <div className="flex flex-col items-center justify-center flex-1 space-y-2 animate-in fade-in duration-500">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Hello there!
          </h1>
          <p className="text-muted-foreground text-center">
            I'm Saify. How can I help you today?
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-8 mb-4 px-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex w-full flex-col",
              m.role === "user" ? "items-end" : "items-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] px-4 py-2 mess rounded-2xl transition-all",
                m.role === "user"
                  ? "bg-blue-500 rounded-tr-none shadow-sm"
                  : "bg-transparent text-foreground",
              )}
            >
              <style jsx>{`
                .mess {
                  color: ${m.role === "user"
                    ? "white"
                    : "inherit"} !important;
                }
                /* This ensures ReactMarkdown's paragraph/prose tags don't override the color */
                .mess :global(p),
                .mess :global(span),
                .mess :global(.prose) {
                  color: ${m.role === "user"
                    ? "white"
                    : "inherit"} !important;
                }
              `}</style>
              {m.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Saify
                  </span>
                </div>
              )}
              <div className="prose prose-sm dark:prose-invert max-w-none wrap-break-word leading-relaxed">
                {m.parts.map((part, i) => (
                  <React.Fragment key={i}>
                    {part.type === "text" && (
                      <ReactMarkdown>
                        {part.text.split("id: 69")[0]}
                      </ReactMarkdown>
                    )}

                    {part.type === "reasoning" && (
                      <div className="text-xs italic opacity-60 mb-2 p-3 border-l-2 bg-muted/20 rounded-r-lg not-prose">
                        <span className="block font-bold not-italic mb-1 opacity-100 uppercase tracking-tighter">
                          Thinking Process:
                        </span>
                        {part.text}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {m.role === "assistant" && (
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(m.parts, m.id)}
                  >
                    {copiedId === m.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="pl-2 animate-in fade-in">
            <ThinkingLoader />
          </div>
        )}

        {hasError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive animate-in shake">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div className="flex-1 text-sm">
              <p className="font-medium">Something went wrong</p>
              <p className="opacity-80">
                {error?.message || "Check your connection."}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => {
                const lastUserMsg = messages
                  .filter((m) => m.role === "user")
                  .pop();
                const lastText = lastUserMsg?.parts.find(
                  (p): p is TextUIPart => p.type === "text",
                )?.text;
                if (lastText) sendMessage({ text: lastText });
              }}
            >
              <RefreshCcw className="h-4 w-4" /> Retry
            </Button>
          </div>
        )}

        <div ref={messagesEndRef} className="h-4" />
      </div>

      <form
        onSubmit={handleSend}
        className="relative self-center min-w-87.5 max-w-88  group bg-muted/10 border border-border rounded-[28px] p-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/20"
      >
        <div className="flex justify-center max-w-sm items-end gap-2 px-2">
          <Select
            value={model}
            onValueChange={(value) => {
              setModel(value as typeof model);
            }}
          >
            <SelectTrigger className="w-15 h-8 text-[10px] mt-0 mb-1 rounded-full border-none bg-muted/50 focus:ring-0">
              <div className="flex items-center gap-1">
                <SelectValue placeholder="Model" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini-2.5-flash-lite">Lite</SelectItem>
              <SelectItem value="gemini-2.5-flash">Fast</SelectItem>
              <SelectItem value="gemini-3-flash-preview">Pro</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder={isTyping ? "Responding..." : "Message Saify..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isTyping}
            className="flex-1 min-h-11 max-h-48 w-full border-0 focus-visible:ring-0 resize-none py-3 text-sm "
            rows={1}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={cn(
              "rounded-full h-10 w-10 p-0 shrink-0 transition-all active:scale-95",
              input.trim() && !isTyping
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                : "bg-muted text-muted-foreground",
            )}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
