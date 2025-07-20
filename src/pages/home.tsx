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
  Users,
  BarChart,
  Target,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Adaptive Learning Engine",
    description:
      "Enterprise-grade AI algorithms that personalize content delivery based on individual learning patterns and performance metrics.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: BarChart,
    title: "Performance Analytics",
    description:
      "Comprehensive reporting dashboard with detailed insights, progress tracking, and data-driven recommendations for improvement.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption, GDPR compliance, and secure data handling to protect your learning progress and personal information.",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description:
      "Professional learning communities with peer review, knowledge sharing, and structured group study sessions.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Target,
    title: "Goal Management",
    description:
      "Strategic learning path planning with milestone tracking, deadline management, and achievement certification.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Award,
    title: "Professional Certification",
    description:
      "Industry-recognized certificates and digital badges that validate your expertise and enhance your professional profile.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

const stats = [
  { number: "100K+", label: "Professionals Trained" },
  { number: "500+", label: "Enterprise Clients" },
  { number: "98%", label: "Completion Rate" },
  { number: "ISO 27001", label: "Security Certified" },
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
                <Shield className="w-4 h-4" />
                <span>Enterprise-Grade Learning Platform</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
                Accelerate Professional Growth with{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  QuizLoom
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                The comprehensive learning management system trusted by Fortune
                500 companies to upskill teams, track progress, and drive
                measurable results.
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
              <CheckCircle className="w-4 h-4" />
              <span>Enterprise Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Built for{" "}
              <span className="text-primary">Professional Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Scalable learning infrastructure designed to meet the demanding
              requirements of modern organizations and professional development
              programs.
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
                      Scale
                    </span>{" "}
                    Your Organization?
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Join industry leaders who trust QuizLoom to deliver
                    measurable learning outcomes and drive organizational
                    excellence.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                  <Button
                    size="lg"
                    className="group px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link to="/auth/register">
                      Request Demo
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Enterprise trial available • Implementation support included
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
