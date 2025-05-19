import { QuizForm } from "@/components/admin/quiz-form";

export default function NewQuizPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Quiz</h1>
        <p className="text-muted-foreground">
          Create a new quiz with questions, settings, and options.
        </p>
      </div>

      <QuizForm />
    </div>
  );
}
