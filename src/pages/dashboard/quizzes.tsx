import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { DataTable } from "@/components/dashboard/tables/data-table";
import { columns } from "@/components/dashboard/tables/columns";
import { taskSchema } from "@/components/dashboard/tables/schema";
import { api } from "@/lib/http-client";
import { z } from "zod";

interface Quiz {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

async function getQuizzes() {
  const response = await api.get("/quizzes");
  if (response.status !== 200) {
    throw new Error("Failed to fetch quizzes");
  }
  const formatedQuizzes = (response.data as Quiz[]).map((quiz) => ({
    id: String(quiz.id),
    title: quiz.name,
    status: "done",
    label: "feature",
    priority: "high",
    created_at: new Date(quiz.created_at).toLocaleDateString(),
    updated_at: new Date(quiz.updated_at).toLocaleDateString(),
  }));

  return formatedQuizzes;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = React.useState<z.infer<typeof taskSchema>[]>(
    [],
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);
        const quizzes = await getQuizzes();
        setQuizzes(quizzes);
        setError(null);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Failed to load quizzes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="w-full mx-auto px-4 py-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Quizzes
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
            Manage your quizzes, create new ones, and view submissions.
          </p>
        </div>
        <Button size="sm" className="self-start sm:self-auto" asChild>
          <Link to="/admin/quizzes/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Quiz
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-1 md:p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-center">
            <p className="text-destructive">{error}</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <p className="text-muted-foreground mb-4">No quizzes found</p>
            <Button asChild>
              <Link to="/admin/quizzes/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create your first quiz
              </Link>
            </Button>
          </div>
        ) : (
          <DataTable data={quizzes} columns={columns} />
        )}
      </div>
    </div>
  );
}
