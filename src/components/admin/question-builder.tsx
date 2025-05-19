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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";

interface QuestionBuilderProps {
  questions: any[];
  setQuestions: (questions: any[]) => void;
  onNext: () => void;
}

export function QuestionBuilder({
  questions,
  setQuestions,
  onNext,
}: QuestionBuilderProps) {
  const [currentQuestion, setCurrentQuestion] = useState({
    id: questions.length + 1,
    type: "multiple-choice",
    question: "",
    options: [
      { id: 1, text: "", isCorrect: false },
      { id: 2, text: "", isCorrect: false },
      { id: 3, text: "", isCorrect: false },
      { id: 4, text: "", isCorrect: false },
    ],
    correctAnswer: "",
    feedback: "",
    tags: [],
  });

  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      id: questions.length + 2,
      type: "multiple-choice",
      question: "",
      options: [
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
        { id: 3, text: "", isCorrect: false },
        { id: 4, text: "", isCorrect: false },
      ],
      correctAnswer: "",
      feedback: "",
      tags: [],
    });
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = { ...updatedOptions[index], text: value };
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const handleCorrectAnswerChange = (index: number) => {
    const updatedOptions = currentQuestion.options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
      correctAnswer: currentQuestion.options[index].text,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Question Builder</CardTitle>
          <CardDescription>
            Create and manage questions for your quiz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="question-type">Question Type</Label>
              <Select
                value={currentQuestion.type}
                onValueChange={(value) =>
                  setCurrentQuestion({ ...currentQuestion, type: value })
                }
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">
                    Multiple Choice
                  </SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="multi-select">Multi-select</SelectItem>
                  <SelectItem value="written">Written</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-text">Question</Label>
              <Textarea
                id="question-text"
                placeholder="Enter your question here..."
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    question: e.target.value,
                  })
                }
                className="min-h-[100px]"
              />
            </div>

            {currentQuestion.type === "multiple-choice" && (
              <div className="space-y-4">
                <Label>Options</Label>
                <RadioGroup
                  value={currentQuestion.options
                    .findIndex((o) => o.isCorrect)
                    .toString()}
                  onValueChange={(value) =>
                    handleCorrectAnswerChange(parseInt(value))
                  }
                >
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                      />
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {currentQuestion.type === "true-false" && (
              <div className="space-y-4">
                <Label>Options</Label>
                <RadioGroup
                  value={currentQuestion.correctAnswer}
                  onValueChange={(value) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: value,
                    })
                  }
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
              </div>
            )}

            {currentQuestion.type === "multi-select" && (
              <div className="space-y-4">
                <Label>Options (Select all correct answers)</Label>
                {currentQuestion.options.map((option, index) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`option-${index}`}
                      checked={option.isCorrect}
                      onCheckedChange={(checked) => {
                        const updatedOptions = [...currentQuestion.options];
                        updatedOptions[index] = {
                          ...updatedOptions[index],
                          isCorrect: checked as boolean,
                        };
                        setCurrentQuestion({
                          ...currentQuestion,
                          options: updatedOptions,
                        });
                      }}
                    />
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            )}

            {currentQuestion.type === "written" && (
              <div className="space-y-2">
                <Label htmlFor="correct-answer">Sample Correct Answer</Label>
                <Textarea
                  id="correct-answer"
                  placeholder="Enter a sample correct answer..."
                  value={currentQuestion.correctAnswer}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: e.target.value,
                    })
                  }
                  className="min-h-[100px]"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback (Optional)</Label>
              <Textarea
                id="feedback"
                placeholder="Enter feedback for this question..."
                value={currentQuestion.feedback}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    feedback: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Optional)</Label>
              <Input
                id="tags"
                placeholder="Enter tags separated by commas..."
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
              />
            </div>

            <Button
              onClick={addQuestion}
              disabled={!currentQuestion.question.trim()}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>

          {questions.length > 0 && (
            <div className="space-y-4 mt-8">
              <h3 className="text-lg font-medium">
                Added Questions ({questions.length})
              </h3>
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div>
                      <span className="font-medium">Question {index + 1}:</span>{" "}
                      {q.question.substring(0, 50)}
                      {q.question.length > 50 ? "..." : ""}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuestion(q.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={onNext} disabled={questions.length === 0}>
            Continue to Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
