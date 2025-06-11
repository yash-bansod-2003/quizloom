import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { DataTable } from "@/components/dashboard/tables/data-table";
import { columns } from "@/components/dashboard/tables/columns";
import { useGetQuizzesQuery } from "@/services/quizzes";

export default function QuizzesPage() {
  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

  const getErrorMessage = () => {
    if (error && typeof error === "object" && "message" in error) {
      return error.message as string;
    }
    if (error && typeof error === "object" && "data" in error) {
      return (
        (error.data as any)?.message ||
        "An error occurred while fetching quizzes"
      );
    }
    return typeof error === "string"
      ? error
      : "An error occurred while fetching quizzes";
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex justify-center items-center h-64 text-center">
          <div className="space-y-2">
            <p className="text-destructive">{getErrorMessage()}</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              size="sm"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    if (!quizzes || quizzes.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-64 text-center">
          <p className="text-muted-foreground mb-4">No quizzes found</p>
          <Button asChild>
            <Link to="/admin/quizzes/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create your first quiz
            </Link>
          </Button>
        </div>
      );
    }

    return <DataTable data={quizzes} columns={columns} />;
  };

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
        {renderContent()}
      </div>
    </div>
  );
}
