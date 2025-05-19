import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Info } from "lucide-react";

interface QuizIntroPageProps {
  params: {
    id: string;
  };
}

export default function QuizIntroPage({ params }: QuizIntroPageProps) {
  // In a real app, you would fetch the quiz data based on the ID
  const quiz = {
    id: params.id,
    title: "JavaScript Basics",
    description:
      "Test your knowledge of JavaScript fundamentals including variables, functions, objects, arrays, and more.",
    questions: 15,
    duration: 30,
    instructions:
      "Read each question carefully. Select the best answer for each question. You can navigate between questions using the Next and Previous buttons. Your progress will be saved automatically.",
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <CardDescription className="text-base">
            {quiz.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">{quiz.questions}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">{quiz.duration}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted p-4">
            <div className="flex items-center gap-2 font-medium">
              <Info className="h-4 w-4" />
              Instructions
            </div>
            <p className="mt-2 text-sm">{quiz.instructions}</p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Before you begin:</h3>
            <ul className="text-sm space-y-1">
              <li>• Ensure you have a stable internet connection</li>
              <li>
                • Allow approximately {quiz.duration} minutes to complete the
                quiz
              </li>
              <li>• Read each question carefully before answering</li>
              <li>• Your progress will be saved automatically</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link to={`/quizzes/${quiz.id}/take`}>Start Quiz</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
