import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Composant CodeBlock amélioré pour afficher du code avec des options de copie et téléchargement
 * @param {string} code - Le code à afficher
 * @param {string} language - Le langage du code (pour la coloration syntaxique)
 * @param {string} className - Classes CSS additionnelles
 * @param {string} title - Titre optionnel pour le bloc de code
 * @param {string} filename - Nom de fichier optionnel pour le téléchargement
 */
export function CodeBlock({ 
  code, 
  language = "jsx", 
  className, 
  title,
  filename = "component.jsx" 
}) {
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

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn("relative rounded-md bg-[#1c1c1f] overflow-hidden mb-4", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-secondary">{language}</span>
          {title && <span className="text-xs font-medium text-primary ml-2">{title}</span>}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={downloadCode}
            className="p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Download code"
            title="Télécharger le code"
          >
            <Download className="h-4 w-4 text-secondary" />
          </button>
          <button
            onClick={copyToClipboard}
            className="p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Copy code"
            title="Copier le code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-secondary" />
            )}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-primary">{code}</code>
      </pre>
    </div>
  );
}
