import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { QuizzesTable } from "@/components/admin/quizzes-table";

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
          <p className="text-muted-foreground">
            Manage your quizzes, create new ones, and view submissions.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/quizzes/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Quiz
          </Link>
        </Button>
      </div>

      <QuizzesTable />
    </div>
  );
}
