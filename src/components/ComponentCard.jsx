import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { CodeBlock } from "./ui/code-block";
import { cn } from "../lib/utils";

export function ComponentCard({
  title,
  description,
  code,
  preview,
  className,
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="hover:bg-muted flex flex-col gap-2 hover:cursor-pointer">
      <Card className={cn("overflow-hidden", className)}>
        {/* <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-secondary mt-1 text-sm">{description}</p>
      </CardHeader> */}

        <CardContent className="p-0">
          <div className="border-border bg-background border-y p-6">
            <div className="flex min-h-[200px] items-center justify-center">
              {preview}
            </div>
          </div>

          {showCode && (
            <div className="p-4">
              <CodeBlock code={code} language="jsx" />
            </div>
          )}
        </CardContent>

        {/* <CardFooter className="flex justify-between p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? "Hide Code" : "View Code"}
        </Button>
      </CardFooter> */}
      </Card>
      <p className="text-secondary text-sm font-medium">{title}</p>
    </div>
  );
}
