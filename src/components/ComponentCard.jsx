import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { CodeBlock } from "./ui/code-block";
import { cn } from "../lib/utils";

export function ComponentCard({ 
  title, 
  description, 
  code, 
  preview, 
  className 
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-secondary mt-1">{description}</p>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-6 border-y border-border bg-[#151518]">
          <div className="min-h-[200px] flex items-center justify-center">
            {preview}
          </div>
        </div>
        
        {showCode && (
          <div className="p-4">
            <CodeBlock code={code} language="jsx" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between p-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? "Hide Code" : "View Code"}
        </Button>
      </CardFooter>
    </Card>
  );
}
