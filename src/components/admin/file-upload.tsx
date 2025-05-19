"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileText, Upload } from "lucide-react";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);

    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }

    // Check file type
    if (
      selectedFile.type !== "text/plain" &&
      selectedFile.type !== "application/json" &&
      !selectedFile.name.endsWith(".md")
    ) {
      setError("Please upload a .txt, .json, or .md file.");
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selectedFile);

    // Read file content for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        // Try to parse as JSON to validate format
        if (selectedFile.type === "application/json") {
          JSON.parse(content);
        }
        setPreview(
          content.substring(0, 500) + (content.length > 500 ? "..." : ""),
        );
      } catch (err) {
        setError("Invalid file format. Please check your file structure.");
        setPreview(null);
      }
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="quiz-file">Upload Quiz File</Label>
        <Input
          id="quiz-file"
          type="file"
          accept=".txt,.json,.md"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {file && preview && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">{file.name}</span>
          </div>
          <div className="rounded-md border bg-muted p-4">
            <pre className="text-sm whitespace-pre-wrap">{preview}</pre>
          </div>
        </div>
      )}

      <Button className="w-full" disabled={!file || !!error}>
        <Upload className="mr-2 h-4 w-4" />
        Upload and Process
      </Button>
    </div>
  );
}
