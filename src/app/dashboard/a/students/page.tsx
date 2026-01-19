"use client";
import React, { useEffect, useState } from "react";
import { Search, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

interface Student {
  _id: string;
  name: string;
  roomNumber: string; 
  status: boolean;    
}

export default function StudentTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/a/data/students");
        
        if (response.data && response.data.success) {
          setStudents(response.data.students);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full p-2 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">All Students</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by name, email, CNIC, phone, or room..."
            className="pl-10"
          />
        </div>
        <ScrollArea className="h-[65vh] w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="text-center">Room</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                   <TableRow>
                     <TableCell colSpan={4} className="text-center py-10">
                       Loading...
                     </TableCell>
                   </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow key={student._id}> 
                      <TableCell className="font-semibold py-4">
                        {student.name}
                      </TableCell>
                      
                      <TableCell className="text-center">
                        {student.roomNumber || "Unassigned"}
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <Badge
                          variant={student.status ? "default" : "secondary"}
                          className={`border-none px-3 py-1 ${
                            student.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {student.status ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}