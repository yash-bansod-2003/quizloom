import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/admin/file-upload";
import { Loader2, Wand2 } from "lucide-react";

interface AiQuizGeneratorProps {
  onNext: () => void;
}

export function AiQuizGenerator({ onNext }: AiQuizGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    setLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedQuiz(`# Quiz: Web Development Fundamentals

## Questions

1. **What does HTML stand for?**
   - A) Hyper Text Markup Language
   - B) High Tech Modern Language
   - C) Hyper Transfer Markup Language
   - D) Home Tool Markup Language
   
   *Correct Answer: A*

2. **Which CSS property is used to change the text color of an element?**
   - A) font-color
   - B) text-color
   - C) color
   - D) text-style
   
   *Correct Answer: C*

3. **What is the correct JavaScript syntax to change the content of the HTML element with id "demo"?**
   - A) document.getElement("demo").innerHTML = "Hello World!";
   - B) document.getElementById("demo").innerHTML = "Hello World!";
   - C) #demo.innerHTML = "Hello World!";
   - D) document.getElementByName("demo").innerHTML = "Hello World!";
   
   *Correct Answer: B*`);
      setLoading(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Based Quiz Generation</CardTitle>
        <CardDescription>
          Generate quiz questions using AI or upload a quiz file.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate with AI</TabsTrigger>
            <TabsTrigger value="upload">Upload Quiz File</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt for AI</Label>
              <Textarea
                id="prompt"
                placeholder="Create a quiz about web development fundamentals with 10 multiple choice questions..."
                className="min-h-[120px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Quiz
                </>
              )}
            </Button>

            {generatedQuiz && (
              <div className="mt-4 space-y-2">
                <Label>Generated Quiz Preview</Label>
                <div className="rounded-md border bg-muted p-4">
                  <pre className="text-sm whitespace-pre-wrap">
                    {generatedQuiz}
                  </pre>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <FileUpload />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setLoading(false)}>
          Cancel
        </Button>
        <Button onClick={onNext} disabled={!generatedQuiz && !loading}>
          Continue to Questions
        </Button>
      </CardFooter>
    </Card>
  );
}
