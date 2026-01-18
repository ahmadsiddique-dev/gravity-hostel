import React from "react";
import { CalendarDays, Check, X, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const attendanceData = [
  { date: "16/12/2025", status: "Absent", time: "00:00:00" },
  { date: "15/12/2025", status: "Present", time: "00:00:00" },
  { date: "11/12/2025", status: "Present", time: "00:00:00" },
  { date: "10/12/2025", status: "Absent", time: "05:00:00" },
  { date: "09/12/2025", status: "Present", time: "00:00:00" },
  { date: "03/12/2025", status: "Present", time: "04:56:03" },
  { date: "02/12/2025", status: "Present", time: "04:56:03" },
  { date: "01/12/2025", status: "Present", time: "04:56:03" },
  { date: "30/11/2025", status: "Present", time: "04:50:12" },
  { date: "29/11/2025", status: "Absent", time: "00:00:00" },
  { date: "09/12/2025", status: "Present", time: "00:00:00" },
  { date: "03/12/2025", status: "Present", time: "04:56:03" },
  { date: "02/12/2025", status: "Present", time: "04:56:03" },
  { date: "01/12/2025", status: "Present", time: "04:56:03" },
  { date: "30/11/2025", status: "Present", time: "04:50:12" },
  { date: "29/11/2025", status: "Absent", time: "00:00:00" },
];

export default function AttendanceHistory() {
  return (
    // Changed max-w-5xl to w-full to take up the whole width
    <div className="flex flex-col w-full p-4 md:p-8 overflow-hidden bg-background">
      
      {/* HEADER SECTION (Fixed) */}
      {/* <div className="flex-none mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary rounded-2xl shadow-inner">
            <CalendarDays className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Attendance History</h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Detailed log of your presence and timing records.
            </p>
          </div>
        </div>
      </div> */}

      {/* TABLE SECTION (Flexible & Full Width) */}
      <div className="flex-1 flex flex-col min-h-0 bg-card border border-border rounded-2xl overflow-hidden shadow-md">
        
        {/* Sticky Header stays at the top of the table */}
        <div className="w-full border-b border-border bg-secondary/20 backdrop-blur-sm px-6 py-3">
           <div className="grid grid-cols-3 w-full">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Date</span>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-center">Status</span>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-right">Time</span>
           </div>
        </div>

        {/* This area scrolls independently */}
          <div className="px-6">
        <ScrollArea className="flex-1 h-[70vh] w-full">
            <Table>
              <TableBody>
                {attendanceData.map((record, index) => (
                  <TableRow 
                    key={index} 
                    className="border-border hover:bg-secondary/10 transition-all group"
                  >
                    <TableCell className="py-5 font-semibold text-base sm:text-lg">
                      {record.date}
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <StatusBadge status={record.status} />
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-2 font-mono text-sm bg-secondary/40 px-3 py-1.5 rounded-lg border border-border group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {record.time}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </ScrollArea>
          </div>
          <div className="h-8" /> {/* Bottom padding */}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isPresent = status === "Present";
  
  return (
    <Badge 
      variant="outline" 
      className={`
        px-4 py-1.5 text-xs font-bold gap-2 rounded-full border-2
        ${isPresent 
          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
          : "bg-rose-500/10 text-rose-500 border-rose-500/20"
        }
      `}
    >
      <div className={`h-2 w-2 rounded-full ${isPresent ? "bg-emerald-500" : "bg-rose-500"}`} />
      {status}
    </Badge>
  );
}