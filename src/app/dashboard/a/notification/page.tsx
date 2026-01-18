"use client"
import React, { useState } from "react";
import { Users, User, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NotificationComposer() {
  const [target, setTarget] = useState<"all" | "specific">("all");

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      {/* <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Send announcements to students.</p>
      </div> */}

      <Card className="bg-card border-border">
        {/* <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Compose Message</CardTitle>
          <CardDescription>Select audience and write your message.</CardDescription>
        </CardHeader> */}

        <CardContent className="space-y-8">
          {/* Target Audience Selector */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Target Audience</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setTarget("all")}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all space-y-2 ${
                  target === "all"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-transparent text-muted-foreground hover:border-muted-foreground/50"
                }`}
              >
                <Users className="h-6 w-6" />
                <span className="font-bold">All Students</span>
              </button>

              <button
                onClick={() => setTarget("specific")}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all space-y-2 ${
                  target === "specific"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-transparent text-muted-foreground hover:border-muted-foreground/50"
                }`}
              >
                <User className="h-6 w-6" />
                <span className="font-bold">Specific Student</span>
              </button>
            </div>
          </div>

          {/* Conditional Student Selection */}
          {target === "specific" && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label className="text-sm font-semibold">Select Student</Label>
              <Select>
                <SelectTrigger className="w-full bg-secondary/50 border-border h-12">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ali Hassan (Room 304)</SelectItem>
                  <SelectItem value="2">Ahmed Raza (Room 209)</SelectItem>
                  <SelectItem value="3">Bilal Khan (Room 309)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Message Textarea */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Message</Label>
            <Textarea
              placeholder="Type your announcement here..."
              className="min-h-[150px] bg-secondary/30 border-border resize-none focus-visible:ring-primary/20"
            />
          </div>

          {/* Action Button */}
          <Button className="w-full h-12 text-lg font-semibold gap-2 shadow-lg" size="lg">
            <Send className="h-5 w-5" />
            Send Notification
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}