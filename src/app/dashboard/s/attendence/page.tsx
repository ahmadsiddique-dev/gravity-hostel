"use client";
import React, { useEffect, useState } from "react";
import { CalendarDays, Check, X, Clock, Loader2 } from "lucide-react";
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
import axios from "axios";
import { toast } from "sonner";
import { getId } from "@/hooks/get-id";

interface IAttendace {
  date: string;
  status: boolean;
  updatedAt: string;
}

  export const formatUtcTime = (isoString: string): string => {
    if (!isoString) return "00:00:00";

    const date = new Date(isoString);

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

export default function AttendanceHistory() {
  const [data, setData] = useState<IAttendace[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAttendance = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/s/getattendance", {
        _id: getId(),
      });
      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        setData(response.data.data);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occured");
      }
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    getAttendance();
  }, []);
  return (
    <div className="flex flex-col w-full p-4 md:p-8 overflow-hidden bg-background">
      <div className="flex-1 flex flex-col min-h-0 bg-card border border-border rounded-2xl overflow-hidden shadow-md">
        <div className="w-full border-b border-border bg-secondary/20 backdrop-blur-sm px-6 py-3">
          <div className="grid grid-cols-3 w-full">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Date
            </span>
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-center">
              Status
            </span>
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-right">
              Time
            </span>
          </div>
        </div>
        <div className="px-6">
          <ScrollArea className="flex-1 h-[70vh] w-full">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-full text-5xl flex justify-center items-centerr" />
              </>
            ) : (
              <>
                <Table>
                  <TableBody>
                    {data.map((record, index) => (
                      <TableRow
                        key={index}
                        className="border-border hover:bg-secondary/10 transition-all group"
                      >
                        <TableCell className="py-5 font-semibold text-base sm:text-lg">
                          {record.date}
                        </TableCell>

                        <TableCell className="text-center">
                          <StatusBadge
                            status={record.status ? "Present" : "Absent"}
                          />
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="inline-flex items-center gap-2 font-mono text-sm bg-secondary/40 px-3 py-1.5 rounded-lg border border-border group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            {formatUtcTime(record.updatedAt)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </ScrollArea>
        </div>
        <div className="h-8" />
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
        ${
          isPresent
            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            : "bg-rose-500/10 text-rose-500 border-rose-500/20"
        }
      `}
    >
      <div
        className={`h-2 w-2 rounded-full ${isPresent ? "bg-emerald-500" : "bg-rose-500"}`}
      />
      {status}
    </Badge>
  );
}
