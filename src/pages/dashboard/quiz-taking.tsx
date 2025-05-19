import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface QuizTakingPageProps {
  params: {
    id: string;
  };
}

export default function QuizTakingPage({ params }: QuizTakingPageProps) {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample quiz data - in a real app, you would fetch this based on the ID
  const quiz = {
    id: params.id,
    title: "JavaScript Basics",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does the 'typeof' operator return for an array?",
        options: [
          { id: 1, text: "array" },
          { id: 2, text: "object" },
          { id: 3, text: "list" },
          { id: 4, text: "collection" },
        ],
        correctAnswer: "object",
      },
      {
        id: 2,
        type: "true-false",
        question: "JavaScript is a statically typed language.",
        correctAnswer: "false",
      },
      {
        id: 3,
        type: "multi-select",
        question: "Which of the following are JavaScript data types?",
        options: [
          { id: 1, text: "String" },
          { id: 2, text: "Number" },
          { id: 3, text: "Class" },
          { id: 4, text: "Boolean" },
        ],
        correctAnswers: ["String", "Number", "Boolean"],
      },
      {
        id: 4,
        type: "written",
        question: "Explain the concept of closures in JavaScript.",
        sampleAnswer:
          "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).",
      },
    ],
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // In a real app, you would submit the answers to your backend
    setTimeout(() => {
      navigate(`/quizzes/${quiz.id}/results`);
    }, 1500);
  };

  const handleAnswerChange = (value: any) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: value,
    });
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Format time left
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{quiz.title}</h1>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium">
          <Clock className="h-5 w-5" />
          {formattedTime}
        </div>
      </div>

      <div className="mb-6">
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentQuestion.type === "multiple-choice" && (
            <RadioGroup
              value={answers[currentQuestionIndex] || ""}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.text}
                    id={`option-${option.id}`}
                  />
                  <Label htmlFor={`option-${option.id}`} className="flex-1">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === "true-false" && (
            <RadioGroup
              value={answers[currentQuestionIndex] || ""}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false">False</Label>
              </div>
            </RadioGroup>
          )}

          {currentQuestion.type === "multi-select" && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const currentAnswers = answers[currentQuestionIndex] || [];
                return (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`option-${option.id}`}
                      checked={currentAnswers.includes(option.text)}
                      onCheckedChange={(checked) => {
                        const newAnswers = [
                          ...(answers[currentQuestionIndex] || []),
                        ];
                        if (checked) {
                          newAnswers.push(option.text);
                        } else {
                          const index = newAnswers.indexOf(option.text);
                          if (index !== -1) {
                            newAnswers.splice(index, 1);
                          }
                        }
                        handleAnswerChange(newAnswers);
                      }}
                    />
                    <Label htmlFor={`option-${option.id}`} className="flex-1">
                      {option.text}
                    </Label>
                  </div>
                );
              })}
            </div>
          )}

          {currentQuestion.type === "written" && (
            <Textarea
              placeholder="Type your answer here..."
              value={answers[currentQuestionIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="min-h-[150px]"
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {timeLeft < 60 && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Time is almost up!</AlertTitle>
          <AlertDescription>
            You have less than a minute remaining to complete this quiz.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
