import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Trophy,
  Users,
  Timer,
  BarChart,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Diverse Quiz Categories",
    description:
      "From general knowledge to specific subjects, explore a wide range of topics that suit your interests and learning goals.",
  },
  {
    icon: Timer,
    title: "Time-Based Challenges",
    description:
      "Test your knowledge under pressure with our time-based quiz challenges. Perfect for competitive learning!",
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description:
      "Earn badges, trophies, and climb the leaderboard as you master different topics and challenge yourself.",
  },
  {
    icon: Users,
    title: "Social Learning",
    description:
      "Connect with other learners, compete in multiplayer quizzes, and share your achievements with friends.",
  },
  {
    icon: BarChart,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and performance insights.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Test Your Knowledge with{" "}
              <span className="text-primary">QuizLoom</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              Challenge yourself with engaging quizzes, track your progress, and
              compete with others in a fun learning environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose QuizLoom?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers everything you need to make learning engaging
              and effective.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="py-12">
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of learners who are already improving their
                  knowledge with QuizLoom.
                </p>
                <Button size="lg" className="group" asChild>
                  <Link to="/auth/register">
                    Create Your Account
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
