import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentActivity() {
  const activities = [
    {
      user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
      activity: "Completed 'JavaScript Basics' quiz",
      score: "85%",
      time: "2 hours ago",
    },
    {
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JS",
      },
      activity: "Started 'React Fundamentals' quiz",
      score: "In progress",
      time: "3 hours ago",
    },
    {
      user: {
        name: "Mike Johnson",
        email: "mike@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MJ",
      },
      activity: "Completed 'CSS Mastery' quiz",
      score: "92%",
      time: "5 hours ago",
    },
    {
      user: {
        name: "Sarah Williams",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SW",
      },
      activity: "Completed 'TypeScript Basics' quiz",
      score: "78%",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={activity.user.avatar || "/placeholder.svg"}
              alt={activity.user.name}
            />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name}
            </p>
            <p className="text-sm text-muted-foreground">{activity.activity}</p>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                {activity.time}
              </span>
              <span className="mx-2 text-xs text-muted-foreground">•</span>
              <span className="text-xs font-medium">{activity.score}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
