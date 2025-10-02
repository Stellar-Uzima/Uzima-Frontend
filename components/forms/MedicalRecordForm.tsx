
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addRecord } from "@/lib/db";
import { MedicalRecord } from "@/types/medical-record";

const formSchema = z.object({
  patientName: z.string().min(2, { message: "Patient name must be at least 2 characters." }),
  diagnosis: z.string().min(5, { message: "Diagnosis must be at least 5 characters." }),
  treatment: z.string().min(5, { message: "Treatment must be at least 5 characters." }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format." }),
  filePath: z.string().optional(),
});

type MedicalRecordFormProps = {
  initialData?: MedicalRecord;
};

export function MedicalRecordForm({ initialData }: MedicalRecordFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          patientName: initialData.patientName,
          diagnosis: initialData.diagnosis,
          treatment: initialData.treatment,
          date: initialData.date,
          filePath: initialData.filePath,
        }
      : {
          patientName: "",
          diagnosis: "",
          treatment: "",
          date: new Date().toISOString().split("T")[0],
          filePath: "",
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newRecord: MedicalRecord = {
      id: initialData?.id || uuidv4(),
      ...values,
      createdBy: "current_user_id", // Replace with actual user ID from auth
      syncStatus: "pending",
    };

    await addRecord(newRecord);

    toast({
      title: "Medical Record Saved",
      description: "Record saved locally and will sync when online.",
    });

    router.push("/medical-records");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Medical Record" : "Create New Medical Record"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Patient's Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter diagnosis details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="treatment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treatment</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter treatment plan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="filePath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Path (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., /documents/xray-scan.pdf" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{initialData ? "Save Changes" : "Create Record"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
