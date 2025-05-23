import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../../lib/utils";

export function CodeBlock({ code, language = "jsx", className }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className={cn("relative rounded-md bg-[#1c1c1f] overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-border">
        <span className="text-xs font-medium text-secondary">{language}</span>
        <button
          onClick={copyToClipboard}
          className="p-1 rounded-md hover:bg-muted transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-secondary" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-primary">{code}</code>
      </pre>
    </div>
  );
}
