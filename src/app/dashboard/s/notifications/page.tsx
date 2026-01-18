import React from "react";
import { Bell, MoreHorizontal, CheckCheck, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    title: "Office Meeting",
    message:
      "We have to talk, please come to my office to discuss the upcoming schedule.",
    time: "11/12/2025",
    isNew: true,
  },
  {
    id: 2,
    title: "Evening Assembly",
    message:
      "You all need to be in the main hall this evening for the mandatory briefing.",
    time: "11/12/2025",
    isNew: true,
  },
  {
    id: 3,
    title: "Health Advisory",
    message:
      "Take care of your health. Ensure you are following the latest hygiene protocols.",
    time: "11/12/2025",
    isNew: false,
  },
  {
    id: 4,
    title: "Disciplinary Update",
    message: "Please maintain decorum in the hostel premises at all times.",
    time: "11/12/2025",
    isNew: false,
  },
  {
    id: 5,
    title: "Office Meeting",
    message:
      "We have to talk, please come to my office to discuss the upcoming schedule.",
    time: "11/12/2025",
    isNew: true,
  },
  {
    id: 6,
    title: "Evening Assembly",
    message:
      "You all need to be in the main hall this evening for the mandatory briefing.",
    time: "11/12/2025",
    isNew: true,
  },
  {
    id: 7,
    title: "Health Advisory",
    message:
      "Take care of your health. Ensure you are following the latest hygiene protocols.",
    time: "11/12/2025",
    isNew: false,
  },
  {
    id: 8,
    title: "Disciplinary Update",
    message: "Please maintain decorum in the hostel premises at all times.",
    time: "11/12/2025",
    isNew: false,
  },
  {
    id: 9,
    title: "Office Meeting",
    message:
      "We have to talk, please come to my office to discuss the upcoming schedule.",
    time: "11/12/2025",
    isNew: true,
  },
  {
    id: 10,
    title: "Evening Assembly",
    message:
      "You all need to be in the main hall this evening for the mandatory briefing.",
    time: "11/12/2025",
    isNew: true,
  },
  {
    id: 11,
    title: "Health Advisory",
    message:
      "Take care of your health. Ensure you are following the latest hygiene protocols.",
    time: "11/12/2025",
    isNew: false,
  },
  {
    id: 12,
    title: "Disciplinary Update",
    message: "Please maintain decorum in the hostel premises at all times.",
    time: "11/12/2025",
    isNew: false,
  },
];

export default function NotificationPage() {
  return (
    <div className="flex flex-col w-full bg-background p-4 md:p-8 overflow-hidden">
      
      {/* 1. FIXED HEADER SECTION */}
      <div className="flex-none mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Notifications
              </h1>
              <p className="text-sm text-muted-foreground">
                Stay updated with hostel announcements
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 h-9 w-full sm:w-auto"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </div>

      {/* 2. SCROLLABLE NOTIFICATION FEED */}
      {/* Fixed: 
          - flex-1 allows this container to grow to fill remaining screen space.
          - border and rounded corners are applied here so the scrollbar stays inside.
      */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <ScrollArea className="h-[70vh] w-full">
          <div className="divide-y divide-border">
            {notifications.map((notif, index) => (
              <div
                /* Note: Ensure unique keys if IDs repeat in your data */
                key={`${notif.id}-${index}`}
                className={`group flex items-start gap-4 p-5 transition-colors hover:bg-secondary/20 cursor-pointer ${
                  notif.isNew ? "bg-primary/[0.02]" : ""
                }`}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className={`text-sm font-semibold tracking-tight ${
                        notif.isNew ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {notif.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-none">
                      <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 font-medium whitespace-nowrap">
                        <Calendar className="h-3 w-3" />
                        {notif.time}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Bottom padding so the last item isn't flush with the edge */}
          <div className="h-6" />
        </ScrollArea>
      </div>
    </div>
  );
}