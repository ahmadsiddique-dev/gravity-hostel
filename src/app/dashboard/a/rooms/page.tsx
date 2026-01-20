"use client"
import React, { use, useEffect, useState } from "react";
import { 
  Plus, User, Bed, Banknote, MapPin, Users, X 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { toast } from "sonner";

// 1. Type for the individual occupant inside a room
export interface Occupant {
  name: string;
  cnic: string;
}

// 2. Type for the main Room object
export interface Room {
  id: number | string;   // Mapped from "$number". Usually number, but safe to allow string
  type: string;          // e.g., "Single", "Shared"
  current: number;       // Calculated via $size
  total: number;         // Mapped from "$capacity"
  price: string;         // Important: It is a string because you formatted it with "PKR"
  floor: string;         // Converted via $toString
  occupants: Occupant[]; // Array of the interface defined above
}

export interface RoomsApiResponse {
  success: boolean;
  rooms: Room[];
  message?: string; 
}

export default function RoomManagement() {
  const [roomsData, setRoomsDate] = useState<Room[]>([]);


  const [changed, setChanged] = React.useState(false);


  useEffect(() => {

      const fetchData = async () => {
        const response = await axios.get<RoomsApiResponse>('/api/a/data/rooms');
        if (response.data.success) {
          const data = await response.data;
          setRoomsDate(data.rooms);
          console.log(data);
        }
        else {
          toast.error("Failed to fetch rooms data.");
        }
      }

    fetchData();
  }, [changed]);
  return (

    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Rooms</h1>
          <p className="text-sm text-muted-foreground">Manage hostel rooms and occupancy.</p>
        </div>
        <Button className="w-full sm:w-auto gap-2">
          <Plus className="h-4 w-4" /> Add Room
        </Button>
      </div>

      <ScrollArea className="h-[68vh] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomsData.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </ScrollArea>
    </div>
  );
}

function RoomCard({ room }: { room: Room }) {
  const occupancyPercentage = (room.current / room.total) * 100;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">Room {room.id}</CardTitle>
          <p className="text-sm text-muted-foreground">{room.type}</p>
        </div>
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none">
          available
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Occupancy</span>
            <span>{room.current} / {room.total}</span>
          </div>
          <Progress value={occupancyPercentage} className="h-2" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {[...Array(room.current)].map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-foreground font-semibold hover:no-underline p-0">
                View Details
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-125 bg-card border-border p-0 overflow-hidden">
              <div className="p-6 space-y-6">
                <DialogHeader className="flex flex-row justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-secondary rounded-lg">
                        <Bed className="h-5 w-5" />
                      </div>
                      <DialogTitle className="text-2xl font-bold">Room {room.id}</DialogTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">Detailed information about this room and its occupants</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none">Available</Badge>
                      <Badge variant="outline">Standard</Badge>
                    </div>
                  </div>
                </DialogHeader>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <InfoBox icon={<Bed className="h-4 w-4" />} label="Capacity" value={`${room.total} Beds`} />
                  <InfoBox icon={<Banknote className="h-4 w-4" />} label="Price/Month" value={room.price} />
                  <InfoBox icon={<Users className="h-4 w-4" />} label="Occupied" value={room.current.toString()} />
                  <InfoBox icon={<MapPin className="h-4 w-4" />} label="Floor" value={room.floor} />
                </div>

                {/* Occupants List */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-semibold">
                    <User className="h-4 w-4" /> Occupants ({room.current}/{room.total})
                  </h4>
                  <div className="space-y-3">
                    {room.occupants.map((occ, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{occ.name}</p>
                            <p className="text-xs text-muted-foreground">{occ.cnic}</p>
                          </div>
                        </div>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[10px] h-5">Active</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card/50 space-y-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="p-1.5 bg-secondary rounded-md">{icon}</div>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-lg font-bold pl-1">{value}</p>
    </div>
  );
}