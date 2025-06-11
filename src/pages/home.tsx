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
  Star,
  Target,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Quiz Engine",
    description:
      "AI-powered adaptive quizzes that adjust to your learning pace and knowledge level for optimal challenge.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Timer,
    title: "Lightning Challenges",
    description:
      "Quick-fire rounds and time-based challenges to sharpen your reflexes and test knowledge under pressure.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Trophy,
    title: "Achievement Hub",
    description:
      "Unlock exclusive badges, earn XP points, and climb global leaderboards as you master new topics.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Users,
    title: "Community Learning",
    description:
      "Join study groups, participate in team challenges, and learn together with a vibrant community.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: BarChart,
    title: "Advanced Analytics",
    description:
      "Detailed performance insights with personalized recommendations to accelerate your learning journey.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Target,
    title: "Personalized Goals",
    description:
      "Set custom learning objectives and track your progress with intelligent milestone tracking.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

const stats = [
  { number: "50K+", label: "Active Learners" },
  { number: "10K+", label: "Quiz Questions" },
  { number: "95%", label: "Success Rate" },
  { number: "24/7", label: "Learning Support" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center space-y-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                <Zap className="w-4 h-4" />
                <span>Powered by Advanced AI</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
                Master Knowledge with{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  QuizLoom
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                Transform your learning experience with intelligent quizzes,
                real-time progress tracking, and a community that grows with
                you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="group px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/auth/register">
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg rounded-full border-2 hover:bg-primary/5"
                asChild
              >
                <Link to="/auth/login">Sign In</Link>
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <Star className="w-4 h-4" />
              <span>Premium Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Everything You Need to <span className="text-primary">Excel</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform combines cutting-edge technology with
              proven learning methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                <CardHeader className="space-y-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"></div>
        <div className="container mx-auto relative">
          <Card className="max-w-5xl mx-auto border-0 bg-card/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="py-16 px-8 md:px-16">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Ready to{" "}
                    <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Transform
                    </span>{" "}
                    Your Learning?
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Join our growing community of passionate learners and
                    discover a smarter way to master new knowledge.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                  <Button
                    size="lg"
                    className="group px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link to="/auth/register">
                      Get Started Today
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Free forever • No credit card required
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
