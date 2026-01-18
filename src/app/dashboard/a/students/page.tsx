import React from "react";
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

const students = [
  { name: "Ali Hassan", room: "304", status: "Active" },
  { name: "Ahmed Raza", room: "209", status: "Active" },
  { name: "Bilal Khan", room: "309", status: "Active" },
  { name: "Danish Ali", room: "103", status: "Active" },
  { name: "Ehsan Ahmed", room: "306", status: "Active" },
  { name: "Faisal Mahmood", room: "103", status: "Active" },
  { name: "Ali Hassan", room: "304", status: "Active" },
  { name: "Ahmed Raza", room: "209", status: "Active" },
  { name: "Bilal Khan", room: "309", status: "Active" },
  { name: "Danish Ali", room: "103", status: "Active" },
  { name: "Ehsan Ahmed", room: "306", status: "Active" },
  { name: "Faisal Mahmood", room: "103", status: "Active" },
  { name: "Ali Hassan", room: "304", status: "Active" },
  { name: "Ahmed Raza", room: "209", status: "Active" },
  { name: "Bilal Khan", room: "309", status: "Active" },
  { name: "Danish Ali", room: "103", status: "Active" },
  { name: "Ehsan Ahmed", room: "306", status: "Active" },
  { name: "Faisal Mahmood", room: "103", status: "Active" },
  { name: "Ali Hassan", room: "304", status: "Active" },
  { name: "Ahmed Raza", room: "209", status: "Active" },
  { name: "Bilal Khan", room: "309", status: "Active" },
  { name: "Danish Ali", room: "103", status: "Active" },
  { name: "Ehsan Ahmed", room: "306", status: "Active" },
  { name: "Faisal Mahmood", room: "103", status: "Active" },
];

export default function StudentTable() {
  return (
    <div className="w-full  p-2 sm:p-8 ">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold tracking-tight">All Students</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by name, email, CNIC, phone, or room..."
            className="pl-10"
          />
        </div>

        {/* Table Container */}
        <ScrollArea className="h-[65vh] w-full">
        <div className="rounded-md  border ">
          <Table>
            <TableHeader className="">
              <TableRow className="">
                <TableHead className=" font-medium">Name</TableHead>
                <TableHead className="">Room</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index} className="">
                  <TableCell className="font-semibold py-4">{student.name}</TableCell>
                  <TableCell className="text-center ">{student.room}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="secondary" 
                      className=" border-none px-3 py-1"
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        </ScrollArea>
      </div>
    </div>
  );
}