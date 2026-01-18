import React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Check, 
  CheckCircle2, 
  Save,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconUserFilled } from "@tabler/icons-react";
// Use the Shadcn UI component
import { ScrollArea } from "@/components/ui/scroll-area";

const students = [
  { id: 1, name: "Ali Hassan", room: "304" },
  { id: 2, name: "Ahmed Raza", room: "209" },
  { id: 3, name: "Bilal Khan", room: "309" },
  { id: 4, name: "Danish Ali", room: "103" },
  { id: 5, name: "Ehsan Ahmed", room: "306" },
  { id: 6, name: "Faisal Mahmood", room: "103" },
  { id: 7, name: "Kamran Akmal", room: "202" },
  { id: 8, name: "Babar Azam", room: "101" },
  { id: 9, name: "Rizwan Ahmed", room: "101" },
  { id: 10, name: "Zain Malik", room: "404" },
  { id: 11, name: "Hamza Abbasi", room: "205" },
];

export default function AttendanceManager() {
  return (
    /* 1. h-[calc(100vh-2rem)] or h-screen ensures the dashboard fits the view.
      2. overflow-hidden prevents the whole page from scrolling.
    */
    <div className="flex flex-col h-[90vh] max-w-5xl mx-auto p-4 md:p-6 overflow-hidden">
      
      {/* FIXED HEADER: This remains "calm" */}
      <div className="flex-none space-y-4 mb-6">
        {/* <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
          <p className="text-sm text-muted-foreground">Mark daily attendance for students</p>
        </div> */}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-3 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg border border-border w-full sm:w-auto justify-between sm:justify-start">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 px-3 font-medium text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Today</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-2 h-9 border-dashed">
              <CheckCircle2 className="h-4 w-4" />
              Mark All
            </Button>
            <Button size="sm" className="flex-1 sm:flex-none gap-2 h-9">
              <Save className="h-4 w-4" />
              Save Attendance
            </Button>
          </div>
        </div>
      </div>

      {/* SCROLLABLE AREA: Only this section moves */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between px-1 mb-3">
          <h3 className="font-semibold text-lg">Student List</h3>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            {students.length} Total
          </span>
        </div>

        {/* The ScrollArea must be inside a flex-1 container 
          to properly calculate the available height.
        */}
        <ScrollArea className="h-full w-full pr-4">
          <div className="grid gap-3 pb-8">
            {students.map((student) => (
              <Card key={student.id} className="bg-card border-border hover:border-muted-foreground/20 transition-all">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-secondary/50">
                        <IconUserFilled size={20} className="text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                      <p className="font-semibold leading-none">{student.name}</p>
                      <p className="text-sm text-muted-foreground font-medium">Room: {student.room}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 hover:text-emerald-500 hover:border-emerald-500/50">
                      <Check className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Present</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 hover:text-destructive hover:border-destructive/50">
                      <X className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Absent</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}