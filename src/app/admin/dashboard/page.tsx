"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Total Posts",
    value: "567",
    change: "+8%",
    icon: FileText,
    color: "text-green-600"
  },
  {
    title: "Comments",
    value: "2,890",
    change: "+23%",
    icon: MessageSquare,
    color: "text-purple-600"
  },
  {
    title: "Page Views",
    value: "45,678",
    change: "+15%",
    icon: TrendingUp,
    color: "text-orange-600"
  }
];

const recentActivities = [
  {
    id: 1,
    action: "New user registered",
    user: "John Doe",
    time: "2 minutes ago"
  },
  {
    id: 2,
    action: "Post published",
    user: "Jane Smith",
    time: "15 minutes ago"
  },
  {
    id: 3,
    action: "Comment added",
    user: "Bob Johnson",
    time: "1 hour ago"
  },
  {
    id: 4,
    action: "User updated profile",
    user: "Alice Brown",
    time: "3 hours ago"
  },
  {
    id: 5,
    action: "New post created",
    user: "Charlie Wilson",
    time: "5 hours ago"
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest activities in your admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action.toLowerCase()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Add New User
                </span>
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </button>
              <button className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Create New Post
                </span>
                <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
              </button>
              <button className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  View Analytics
                </span>
                <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
