import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export function ComponentCard({ title, preview, onClick, className }) {
  return (
    <div className="flex flex-col gap-2">
      <Card
        className={cn(
          "group relative cursor-pointer overflow-hidden",
          className,
        )}
      >
        <CardContent className="border-border p-0" onClick={onClick}>
          <div className="bg-background hover:bg-muted p-6 transition-colors">
            <div className="relative flex min-h-[200px] items-center justify-center">
              {preview}
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button variant="default" className="cursor-pointer">
                  View Code
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="text-secondary text-sm font-medium">{title}</p>
    </div>
  );
}
