"use client"
import React, { useState } from "react";
import { 
  Filter, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw, 
  MessageSquare,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const initialComplaints = [
  {
    id: 1,
    title: "hello dear",
    student: "Ali Hassan",
    date: "10/12/2025",
    description: "just wanted to know about your health hope you are fine",
    status: "RESOLVED",
  },
  {
    id: 2,
    title: "broom",
    student: "Ali Hassan",
    date: "10/12/2025",
    description: "do not broom",
    status: "REJECTED",
  },
  {
    id: 3,
    title: "Noisy roommate",
    student: "Iftikhar Ahmed",
    date: "02/12/2025",
    description: "My roommate plays loud music late at night.",
    status: "PENDING",
  },
  {
    id: 1,
    title: "hello dear",
    student: "Ali Hassan",
    date: "10/12/2025",
    description: "just wanted to know about your health hope you are fine",
    status: "RESOLVED",
  },
  {
    id: 2,
    title: "broom",
    student: "Ali Hassan",
    date: "10/12/2025",
    description: "do not broom",
    status: "REJECTED",
  },
  {
    id: 3,
    title: "Noisy roommate",
    student: "Iftikhar Ahmed",
    date: "02/12/2025",
    description: "My roommate plays loud music late at night.",
    status: "PENDING",
  },
];

export default function ComplaintsManagement() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex flex-col max-w-6xl mx-auto overflow-hidden">
      {/* Fixed Header Area */}
      <div className="flex-none pt-1.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Complaints</h1>
          <p className="text-sm text-muted-foreground">Track and resolve student issues</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card border-border h-10">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Complaints</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Scrollable List Area */}
        <div className="">
      <ScrollArea className="flex-1 flex flex-col  space-y-4 pb-8 gap-2.5 h-[78vh] pr-4">
          {initialComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
      </ScrollArea>
        </div>
    </div>
  );
}

function ComplaintCard({ complaint }: { complaint: any }) {
  const [currentStatus, setCurrentStatus] = useState(complaint.status);

  return (
      
    <Card className="bg-card mb-2.5 border-border  hover:border-muted-foreground/20 transition-all overflow-hidden">
      <CardContent className="p-0 ">
        <div className="flex flex-col md:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 p-5 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-lg leading-tight">{complaint.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> {complaint.student}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {complaint.date}
                  </span>
                </div>
              </div>
              <StatusBadge status={currentStatus} />
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 italic">
              "{complaint.description}"
            </p>
          </div>

          {/* Action Sidebar / Bottom Bar */}
          <div className="flex-none bg-secondary/20 md:w-48 border-t md:border-t-0 md:border-l border-border p-4 flex md:flex-col justify-center items-center gap-2">
            {currentStatus === "PENDING" ? (
              <>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
                  onClick={() => setCurrentStatus("REJECTED")}
                >
                  <XCircle className="h-4 w-4" /> Reject
                </Button>
                <Button 
                  size="sm" 
                  className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setCurrentStatus("RESOLVED")}
                >
                  <CheckCircle2 className="h-4 w-4" /> Resolve
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => setCurrentStatus("PENDING")}
              >
                <RefreshCcw className="h-4 w-4" /> Reopen
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: any = {
    PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    RESOLVED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <Badge variant="outline" className={`${variants[status]} border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider`}>
      {status}
    </Badge>
  );
}