import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuestionBuilder } from "@/components/admin/question-builder";
import { QuizSettings } from "@/components/admin/quiz-settings";
import { AiQuizGenerator } from "@/components/admin/ai-quiz-generator";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export function QuizForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [questions, setQuestions] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    navigate("/admin/quizzes");
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
        <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="basic-info" className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Information</CardTitle>
                <CardDescription>
                  Enter the basic information for your quiz.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter quiz title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the title that will be displayed to users.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter quiz description"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed description of what the quiz is
                        about.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/quizzes")}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab("ai-generator")}
                >
                  Save & Continue
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="ai-generator">
        <AiQuizGenerator onNext={() => setActiveTab("questions")} />
      </TabsContent>

      <TabsContent value="questions">
        <QuestionBuilder
          questions={questions}
          setQuestions={setQuestions}
          onNext={() => setActiveTab("settings")}
        />
      </TabsContent>

      <TabsContent value="settings">
        <QuizSettings onSubmit={() => navigate("/admin/quizzes")} />
      </TabsContent>
    </Tabs>
  );
}
