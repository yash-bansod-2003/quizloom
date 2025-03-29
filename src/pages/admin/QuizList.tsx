import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  status: "draft" | "live";
  createdAt: string;
  updatedAt: string;
}

export function QuizList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "1",
      title: "Sample Quiz",
      status: "draft",
      createdAt: "2024-03-28",
      updatedAt: "2024-03-28",
    },
    // Add more sample quizzes as needed
  ]);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quizzes</h1>
        <Link to="/admin/quizzes/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Quiz
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuizzes.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell className="font-medium">{quiz.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={quiz.status === "live" ? "default" : "secondary"}
                  >
                    {quiz.status}
                  </Badge>
                </TableCell>
                <TableCell>{quiz.createdAt}</TableCell>
                <TableCell>{quiz.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Link to={`/admin/quizzes/${quiz.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(quiz.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default QuizList;
