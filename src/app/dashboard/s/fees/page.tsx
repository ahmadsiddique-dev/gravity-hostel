import React from "react";
import { 
  Download, 
  Filter, 
  Wallet, 
  CheckCircle2, 
  Clock, 
  FileDown, 
  ArrowUpRight 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const feeRecords = [
  { id: 1, month: "December 2025", dueDate: "Dec 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Bank Transfer" },
  { id: 2, month: "November 2025", dueDate: "Nov 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Cash" },
  { id: 1, month: "December 2025", dueDate: "Dec 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Bank Transfer" },
  { id: 2, month: "November 2025", dueDate: "Nov 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Cash" },
  { id: 1, month: "December 2025", dueDate: "Dec 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Bank Transfer" },
  { id: 2, month: "November 2025", dueDate: "Nov 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Cash" },
  { id: 1, month: "December 2025", dueDate: "Dec 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Bank Transfer" },
  { id: 2, month: "November 2025", dueDate: "Nov 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Cash" },
  { id: 1, month: "December 2025", dueDate: "Dec 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Bank Transfer" },
  { id: 2, month: "November 2025", dueDate: "Nov 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Cash" },
  { id: 1, month: "December 2025", dueDate: "Dec 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Bank Transfer" },
  { id: 2, month: "November 2025", dueDate: "Nov 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Cash" },
  { id: 1, month: "December 2025", dueDate: "Dec 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Bank Transfer" },
  { id: 2, month: "November 2025", dueDate: "Nov 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Cash" },
  { id: 1, month: "December 2025", dueDate: "Dec 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Bank Transfer" },
  { id: 2, month: "November 2025", dueDate: "Nov 10, 2025", rent: 20000, mess: 5000, total: 25000, status: "PAID", method: "Cash" },
];

export default function ResponsiveFinancialDashboard() {
  return (
    <div className="w-full bg-background p-4 md:p-8 space-y-6">
      
      {/* HEADER: Title and Top Actions */}
      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">Financial Overview</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage your hostel dues and payment history</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-2 border-border h-9">
            <Filter className="h-4 w-4" /> Filter History
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none gap-2 h-9 bg-white text-black hover:bg-white/90">
            <Download className="h-4 w-4" /> Export All
          </Button>
        </div>
      </div> */}

      {/* STATS GRID: Responsive 1, 2, or 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="CURRENT DUE" 
          amount="25,000" 
          subtitle="Due by Dec 10" 
          icon={<Wallet className="h-4 w-4 text-blue-400" />} 
          action={<Button size="lg" className="h-7 px-3 text-[10px] uppercase font-bold">Pay Now</Button>}
        />
        <StatCard 
          title="TOTAL PAID (2025)" 
          amount="275,000" 
          subtitle="11 Months paid" 
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />} 
          trend={<ArrowUpRight className="h-3 w-3 inline ml-1 opacity-50" />}
        />
        <StatCard 
          title="LATE CHARGES" 
          amount="0" 
          subtitle="Perfect record" 
          icon={<Clock className="h-4 w-4 text-amber-400" />} 
          className="sm:col-span-2 lg:col-span-1" // Makes it span 2 cols on tablet for better balance
        />
      </div>

      {/* TRANSACTION HISTORY: Table Card */}
      <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-sm">
        {/* <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-bold text-lg">Transaction History</h2>
          <Badge variant="secondary" className="font-mono text-[10px] tracking-tighter opacity-70">FY 2025-26</Badge>
        </div> */}

        {/* HORIZONTAL SCROLL AREA: Prevents table breaking on mobile */}
        <ScrollArea className="w-full">
          <div className="min-w-[800px]"> {/* Ensures table doesn't squish too much */}
            <ScrollArea className="h-[45vh] w-full">
            <Table>
              <TableHeader className="bg-secondary/20">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="pl-6 h-10 text-[11px] uppercase font-bold text-muted-foreground">Billing Month</TableHead>
                  <TableHead className="h-10 text-[11px] uppercase font-bold text-muted-foreground">Payment Method</TableHead>
                  <TableHead className="h-10 text-[11px] uppercase font-bold text-muted-foreground text-center">Status</TableHead>
                  <TableHead className="h-10 text-[11px] uppercase font-bold text-muted-foreground text-right">Rent / Mess</TableHead>
                  <TableHead className="h-10 text-[11px] uppercase font-bold text-muted-foreground text-right pr-6">Total Amount</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeRecords.map((fee) => (
                  <TableRow key={fee.id} className="border-border hover:bg-secondary/10 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="font-bold text-sm">{fee.month}</div>
                      <div className="text-[10px] text-muted-foreground">Due: {fee.dueDate}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-background border-border text-[10px] font-bold px-2 py-0">
                        {fee.method}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold text-[11px]">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        PAID
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs font-medium">
                      {fee.rent.toLocaleString()} / {fee.mess.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="font-black text-sm">PKR {fee.total.toLocaleString()}</div>
                    </TableCell>
                    {/* <TableCell className="pr-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary rounded-lg">
                        <FileDown className="h-4 w-4" />
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </ScrollArea>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
}

// COMPACT STAT CARD COMPONENT
function StatCard({ title, amount, subtitle, icon, action, trend, className }: any) {
  return (
    <Card className={`border-border bg-card/40 overflow-hidden ${className}`}>
      <CardContent className="p-4 flex flex-col justify-between h-full min-h-[140px]">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-secondary/50 rounded-xl border border-border">
            {icon}
          </div>
          {action}
        </div>
        <div className="space-y-0.5 mt-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-xl md:text-2xl font-black tracking-tighter">
              PKR {amount}
            </h3>
            {trend}
          </div>
          <p className="text-[11px] text-muted-foreground font-medium italic">
            {subtitle}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}