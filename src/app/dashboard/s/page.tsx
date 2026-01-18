import { ChartAreaInteractive } from "@/components/student-dashboard/Chart";
import { Calendar, CreditCard, Bell, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Attendance Rate",
    value: "87%",
    icon: <Calendar className="h-5 w-5 text-emerald-500" />,
    iconBg: "bg-emerald-500/10",
    valueColor: "text-emerald-500",
  },
  {
    label: "Fee Status",
    value: "All Paid",
    icon: <CreditCard className="h-5 w-5 text-blue-500" />,
    iconBg: "bg-blue-500/10",
    valueColor: "text-foreground",
  },
  {
    label: "Notifications",
    value: "10",
    icon: <Bell className="h-5 w-5 text-amber-500" />,
    iconBg: "bg-amber-500/10",
    valueColor: "text-amber-500",
  },
];

const page = () => {
  return (
    <div>
      <div className="p-2 px-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <h3
                    className={`text-2xl font-black tracking-tight ${stat.valueColor}`}
                  >
                    {stat.value}
                  </h3>
                </div>
                <div
                  className={`p-3 rounded-xl ${stat.iconBg} border border-border/50 flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="relative overflow-hidden border-none from-secondary/50 to-background shadow-2xl">
        {/* Visual Accent Decoration */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40" />
        
        <CardContent className="px-8 md:px-12">
          {/* Large Decorative Quote Icon */}
          <Quote className="absolute top-4 left-6 h-3 w-3 text-primary/10 -scale-x-100" />
          
          <figure className="relative z-10 space-y-4">
            <blockquote className="text-md md:text-lg font-black text-foreground italic">
              "Effortless hostel management. One platform for every student."
            </blockquote>
          </figure>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default page;
