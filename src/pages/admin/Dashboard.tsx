import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Users, BarChart, Settings, Plus, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Quizzes",
    value: "12",
    icon: FileText,
    description: "Active quizzes in your account",
  },
  {
    title: "Total Users",
    value: "245",
    icon: Users,
    description: "Users who have taken quizzes",
  },
  {
    title: "Average Score",
    value: "85%",
    icon: BarChart,
    description: "Average quiz completion rate",
  },
  {
    title: "Recent Activity",
    value: "8",
    icon: Clock,
    description: "Quizzes taken in the last 24 hours",
  },
];

const recentQuizzes = [
  {
    id: "1",
    title: "JavaScript Basics",
    status: "live",
    participants: 45,
    averageScore: 92,
  },
  {
    id: "2",
    title: "React Fundamentals",
    status: "draft",
    participants: 0,
    averageScore: 0,
  },
  {
    id: "3",
    title: "TypeScript Advanced",
    status: "live",
    participants: 28,
    averageScore: 88,
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/admin/quizzes/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Quiz
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {quiz.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {quiz.participants} participants
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">{quiz.averageScore}% avg</div>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        quiz.status === "live"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {quiz.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/admin/quizzes/new">
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Quiz
                </Button>
              </Link>
              <Link to="/admin/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Quiz Settings
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
              <Link to="/admin/users">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
