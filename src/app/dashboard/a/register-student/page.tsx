"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { StudentSignupSchema } from "@/schemas/StudentSignupSchema";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STEP_FIELDS = {
  1: ["studentDetail.studentName", "studentDetail.studentcnic", "studentDetail.studentPhoneNO", "studentDetail.studentEmail"],
  2: ["guardianDetail.guardianName", "guardianDetail.guardianPhoneNO", "guardianDetail.address"],
  3: ["loginCredientials.password", "confirmPassword", "loginCredientials.type", "loginCredientials.roomNumber", "loginCredientials.floor"],
} as const;

export default function Page() {
  const [stepper, setStepper] = React.useState({
    progressValue: 33,
    currentStep: 1,
  });

  const form = useForm<z.infer<typeof StudentSignupSchema>>({
    resolver: zodResolver(StudentSignupSchema),
    mode: "onChange",
    defaultValues: {
      studentDetail: { studentName: "", studentcnic: "", studentPhoneNO: "", studentEmail: "" },
      guardianDetail: { guardianName: "", guardianPhoneNO: "", address: "" },
      loginCredientials: { 
        password: "", capacity: 1, floor: 1, roomNumber: "", 
        type: "standard", price: 15000, status: "available" 
      },
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("student-registration-data");
    if (saved) {
      try { form.reset(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((v) => localStorage.setItem("student-registration-data", JSON.stringify(v)));
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleNext = async () => {
    const fields = STEP_FIELDS[stepper.currentStep as keyof typeof STEP_FIELDS];
    if (await form.trigger(fields as any)) {
      setStepper((prev) => ({
        currentStep: Math.min(3, prev.currentStep + 1),
        progressValue: (Math.min(3, prev.currentStep + 1) / 3) * 100,
      }));
    } else {
      toast.error("Please fix errors.");
    }
  };

  const handlePrevious = () => {
    setStepper((prev) => ({
      currentStep: Math.max(1, prev.currentStep - 1),
      progressValue: (Math.max(1, prev.currentStep - 1) / 3) * 100,
    }));
  };

  return (
    <div className="px-4 py-6">
      <form onSubmit={form.handleSubmit((data) => {
        console.log(data);
        toast.success("Registered!");
        localStorage.removeItem("student-registration-data");
      })} className="max-w-2xl mx-auto flex flex-col gap-4">
        
        <h2 className="text-2xl font-semibold text-center">Register Student</h2>

        <Card className="p-5 shadow-sm">
          {stepper.currentStep === 1 && (
            <div className="grid gap-3">
              <FormField name="studentDetail.studentName" label="Name" control={form.control} />
              <div className="grid grid-cols-2 gap-3">
                <FormField name="studentDetail.studentcnic" label="CNIC" control={form.control} />
                <FormField name="studentDetail.studentPhoneNO" label="Phone" control={form.control} />
              </div>
              <FormField name="studentDetail.studentEmail" label="Email" type="email" control={form.control} />
            </div>
          )}

          {stepper.currentStep === 2 && (
            <div className="grid gap-3">
              <FormField name="guardianDetail.guardianName" label="Guardian Name" control={form.control} />
              <FormField name="guardianDetail.guardianPhoneNO" label="Guardian Phone" control={form.control} />
              <FormField name="guardianDetail.address" label="Address" control={form.control} />
            </div>
          )}

          {stepper.currentStep === 3 && (
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField name="loginCredientials.roomNumber" label="Room #" control={form.control} />
                <div className="flex flex-col gap-1.5">
                  <Label>Floor</Label>
                  <Input type="number" {...form.register("loginCredientials.floor", { valueAsNumber: true })} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Room Type</Label>
                <Controller
                  name="loginCredientials.type"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="delux">Deluxe</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField name="loginCredientials.password" label="Password" type="password" control={form.control} />
                <FormField name="confirmPassword" label="Confirm" type="password" control={form.control} />
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-3">
          <Progress className="h-1.5" value={stepper.progressValue} />
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={stepper.currentStep === 1}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
            </Button>
            {stepper.currentStep < 3 ? (
              <Button type="button" onClick={handleNext}>
                Next <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function FormField({ name, label, control, type = "text" }: any) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          <Label className={fieldState.error ? "text-destructive" : ""}>{label}</Label>
          <Input {...field} type={type} className={fieldState.error ? "border-destructive" : ""} />
          {fieldState.error && <p className="text-[10px] text-destructive">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}